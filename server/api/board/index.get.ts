import db from "db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { board, boardsToUser, user } from "db/schema";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

/**
 *
 * Returns all boards of the given user
 *
 */
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  // verify passed user id
  if (!session) {
    throw createError({
      statusCode: 401, // unauthorized,
    });
  }

  const boards = await db
    .select({ board: board })
    .from(user)
    .leftJoin(boardsToUser, eq(user.id, boardsToUser.boardId))
    .leftJoin(board, eq(board.id, boardsToUser.boardId))
    .where(eq(user.id, session.user.id))
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
