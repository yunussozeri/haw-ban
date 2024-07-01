import { z } from "zod";
import db from "db/db";
import { comments, commentsToTicket } from "db/schema";

const ticketAndComment = z.object({
  ticketId: z.coerce.number(),
  comment: z.string(),
});

/**
 * Submits a ticket for the user
 *
 * @returns the ticket that is submitted
 *
 */

export default defineEventHandler(async (event) => {
  const response = await readValidatedBody(event, ticketAndComment.safeParse);
  if (!response.success) {
    console.log(response.error);
    return {
      success: false,
    } as const;
  }

  const addedComment = await db
    .insert(comments)
    .values({ comment: response.data.comment })
    .returning()
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  if (!addedComment) {
    console.log("comment add unsuccesfull");
    return {
      success: false,
    } as const;
  }
  await db.insert(commentsToTicket).values({
    ticketId: response.data.ticketId,
    commentId: addedComment?.id,
  });

  //return result
  return {
    success: true,
  } as const;
});
