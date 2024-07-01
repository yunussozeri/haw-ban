import { z } from "zod";
import db from "db/db";
import { comments, commentsToTicket } from "db/schema";
import { eq } from "drizzle-orm";

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

  const deletedComment = await db
    .delete(commentsToTicket)
    .where(eq(commentsToTicket.ticketId, response.data.ticketId))
    .returning()
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  if (!deletedComment) {
    return {
      success: false,
    } as const;
  }

  await db.delete(comments).where(eq(comments.id, deletedComment.ticketId));

  //return result
  return {
    success: true,
  } as const;
});
