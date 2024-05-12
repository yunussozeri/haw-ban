import db from "@@/server/db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { board, boardsToUser, user } from "~/server/db/schema";

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

export default defineEventHandler(async (event) => {
  const requestData = await readValidatedBody(event, findUserBody.safeParse);

  // verify passed user id
  if (!requestData.success) {
    throw createError({
      message: "Bad Request : Invalid User Id",
      statusCode: 400,
    });
  }

  const boards = await db
    .select({ boardId: board.id })
    .from(boardsToUser)
    .leftJoin(board, eq(board.id, boardsToUser.boardId))
    .leftJoin(user, eq(user.id, boardsToUser.userId))
    .where(eq(boardsToUser.userId, requestData.data.userId))
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
