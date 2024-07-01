import z from "zod";
import db from "db/db";
import { boardsToUser, ticketsToBoards, user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";
import { and, eq } from "drizzle-orm";

const ticketToDelete = z.object({
  id: z.coerce.number(),
});

/**
 * Deletes the course from given user
 *
 */
export default defineEventHandler(async (event) => {
  const currentUser = await serverSupabaseUser(event);

  // verify passed user
  if (!currentUser) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const request = await readValidatedBody(event, ticketToDelete.safeParse);

  if (!request.success) {
    throw createError({
      statusCode: 401,
    });
  }

  const dbUser = await db
    .select()
    .from(user)
    .where(eq(user.authId, currentUser.id))
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  if (!dbUser) {
    throw createError({
      statusCode: 400,
    });
  }
  const userBoard = db
    .select({ boardId: boardsToUser.boardId })
    .from(boardsToUser)
    .where(eq(boardsToUser.userId, dbUser.id))
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  if (!userBoard) {
    throw createError({
      statusCode: 400,
    });
  }

  //delete course of user
  await db
    .delete(ticketsToBoards)
    .where(and(eq(ticketsToBoards.ticketId, request.data.id)));

  return {
    success: true,
  };
});
