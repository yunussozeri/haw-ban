import db from "db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { board, boardsToUser, tickets, ticketsToBoards, user } from "db/schema";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";
/*
 * Pattern :
    create zod schema for incoming object
    read from object
    perform operation
    return result

 * 
 * 
 */

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

  console.log("incoming");
  // get users name, surname and id

  const userId = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
    .then((value) => {
      if (!value.length) {
        return undefined;
      }
      return value[0];
    });

  if (!userId) {
    return {
      succes: false,
      message: "failed to get user data ",
    };
  }

  const newBoardName = session.user.name?.concat("'s Board");

  const newBoard = await db
    .insert(board)
    .values({
      name: newBoardName,
    })
    .returning();
  console.log("create board");
  if (newBoard[0] == undefined) {
    return {
      success: false,
      message: "error after creating board",
    };
  }

  const joinBoardWithUser = await db
    .insert(boardsToUser)
    .values({
      userId: userId.id,
      boardId: newBoard[0].id,
    })
    .returning();
  console.log("join user w board ");
  console.log(joinBoardWithUser);
  // at this point the board is created and we have the board Id

  if (!joinBoardWithUser.length) {
    return {
      succes: false,
      message: "Could not bind user and board",
    };
  }
  return { success: true } as const;
});
