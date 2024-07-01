import db from "db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { board, boardsToUser, user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";
/*
 * Pattern :
    create zod schema for incoming object
    read from object
    perform operation
    return result

    hallo  test

 * 
 * 
 */

const findUserBody = z.object({
  userId: z.coerce.number(),
});

/**
 *
 * Returns all boards of the given user
 *
 */
export default defineEventHandler(async (event) => {
  const userData = await serverSupabaseUser(event);

  // verify passed user id
  if (!userData) {
    throw createError({
      statusCode: 401, // unauthorized,
    });
  }

  const boards = await db
    .select({ board: board })
    .from(user)
    .leftJoin(boardsToUser, eq(user.id, boardsToUser.boardId))
    .leftJoin(board, eq(board.id, boardsToUser.boardId))
    .where(eq(user.authId, userData.id))
    // find and return board IDs from database
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  // if the user is not found return unsuccesfull
  if (!boards) {
    return {
      success: false,
    } as const;
  }
  // spread operator ...
  return { boards, success: true } as const;
});
