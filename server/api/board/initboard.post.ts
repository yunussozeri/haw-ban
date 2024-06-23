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

  const newBoardName = session.user.name!.concat("'s Board");

  const newBoard = await db
    .insert(board)
    .values({
      name: newBoardName,
    })
    .returning()
    .then((value) => value[0]);
  console.log("create board");
  if (newBoard == undefined) {
    return {
      success: false,
      message: "error after creating board",
    };
  }

  const joinBoardWithUser = await db
    .insert(boardsToUser)
    .values({
      userId: session.user.id,
      boardId: newBoard.id,
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
