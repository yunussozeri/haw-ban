import db from "db/db";
import { eq } from "drizzle-orm";
import { boardsToUser, tickets, ticketsToBoards, user } from "db/schema";

import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

/**
 * Returns tickets of user
 */
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  // verify passed user
  if (!session) {
    throw createError({
      statusCode: 401,
    });
  }

  const userTickets = await db
    .select({ tickets: tickets })
    .from(user)
    .innerJoin(boardsToUser, eq(user.id, boardsToUser.userId))
    .innerJoin(
      ticketsToBoards,
      eq(boardsToUser.boardId, ticketsToBoards.boardId),
    )
    .innerJoin(tickets, eq(ticketsToBoards.ticketId, tickets.id))
    .where(eq(user.id, session.user.id));

  return userTickets;
});
