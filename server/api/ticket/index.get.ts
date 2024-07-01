import { serverSupabaseUser } from "#supabase/server";
import db from "db/db";
import { eq } from "drizzle-orm";
import {
  boardsToUser,
  comments,
  commentsToTicket,
  tickets,
  ticketsToBoards,
  user,
} from "db/schema";

export default defineEventHandler(async (event) => {
  const currentUser = await serverSupabaseUser(event);

  // verify passed user
  if (!currentUser) {
    throw createError({
      statusCode: 401,
    });
  }

  const userTickets = await db
    .select({
      tickets: tickets,
    })
    .from(user)
    .innerJoin(boardsToUser, eq(user.id, boardsToUser.userId))
    .innerJoin(
      ticketsToBoards,
      eq(boardsToUser.boardId, ticketsToBoards.boardId),
    )
    .innerJoin(tickets, eq(ticketsToBoards.ticketId, tickets.id))
    .leftJoin(commentsToTicket, eq(commentsToTicket.ticketId, tickets.id))
    .leftJoin(comments, eq(commentsToTicket.commentId, comments.id))
    .where(eq(user.authId, currentUser.id));

  return userTickets;
});
