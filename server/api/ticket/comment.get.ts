import { serverSupabaseUser } from "#supabase/server";
import db from "db/db";
import { z } from "zod";
import { comments, commentsToTicket, user } from "db/schema";
import { eq } from "drizzle-orm";

const commentSchema = z.object({
  ticketId: z.coerce.number(),
});

export default eventHandler(async (event) => {
  const currentUser = await serverSupabaseUser(event);

  const query = await getValidatedQuery(event, commentSchema.safeParse);

  if (!currentUser) {
    throw createError({
      statusCode: 401,
    });
  }

  if (!query.success) {
    return {
      success: false,
      message: "Error fetching query",
    };
  }
  const comment = await db
    .select({ comment: comments })
    .from(comments)
    .innerJoin(
      commentsToTicket,
      eq(commentsToTicket.ticketId, query.data.ticketId),
    )
    .where(eq(comments.id, commentsToTicket.commentId));
});
