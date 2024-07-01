import db from "db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { board, boardsToUser, tickets, ticketsToBoards, user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";
/*
 * Pattern :
    create zod schema for incoming object
    read from object
    perform operation
    return result

 * 
 * 
 */

const userData = z.object({
  name: z.string(),
  surname: z.string(),
});

/**
 *
 * Returns all boards of the given user
 *
 */
export default defineEventHandler(async (event) => {
  const currentUser = await serverSupabaseUser(event);

  const incoming = await readValidatedBody(event, userData.safeParse);

  console.log(incoming);

  // verify passed user id
  if (!currentUser) {
    throw createError({
      statusCode: 401, // unauthorized,
    });
  }

  console.log("validation");
  if (!incoming.success) {
    return {
      succes: false,
      message: "failed to get data ",
    };
  }
  console.log("incoming");
  // get users name, surname and id

  const userId = await db
    .select()
    .from(user)
    .where(eq(user.authId, currentUser.id))
    .then((value) => {
      if (!value.length) {
        return undefined;
      }
      return value[0];
    });

  console.log("user data select");
  if (!userId) {
    return {
      succes: false,
      message: "failed to get user data ",
    };
  }
  console.log("user data select");
  const newBoardName = incoming.data.name
    .concat(" ")
    .concat(incoming.data.surname)
    .concat("'s Board");

  console.log("user board name");
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
