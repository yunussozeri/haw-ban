import { z } from "zod";
import db from "db/db";
import { serverSupabaseUser } from "#supabase/server";
import {
  board,
  boardsToUser,
  comments,
  commentsToTicket,
  tickets,
  ticketsToBoards,
  user,
} from "db/schema";
import { eq } from "drizzle-orm";
import { add } from "date-fns";

const properties = [
  { value: "uni", label: "uni" },
  { value: "freizeit", label: "freizeit" },
  { value: "hobby", label: "hobby" },
  { value: "sport", label: "sport" },
  { value: "default", label: "default" },
] as const;

//https://stackoverflow.com/questions/73825273/creating-a-zod-enum-from-an-object
type Property = (typeof properties)[number]["value"];
// z.enum expects a non-empty array so to work around that
// we pull the first value out explicitly
const VALUES: [Property, ...Property[]] = [
  properties[0].value,
  // And then merge in the remaining values from `properties`
  ...properties.slice(1).map((p) => p.value),
];

const Property = z.enum(VALUES);

const Ticket = z.object({
  name: z.string(),
  start: z.string().transform((input) => {
    return new Date(input);
  }),
  end: z.string().transform((input) => {
    return new Date(input);
  }),
  category: Property,
  comment: z.string(),
});

/**
 * Submits a ticket for the user
 *
 * @returns the ticket that is submitted
 *
 */

export default defineEventHandler(async (event) => {
  const response = await readValidatedBody(event, Ticket.safeParse);

  const currentUser = await serverSupabaseUser(event);

  if (!currentUser) {
    throw createError({
      statusCode: 401,
    });
  }

  if (!response.success) {
    console.log(response.error);
    return {
      success: false,
    } as const;
  }

  const userBoard = await db
    .select({
      boardId: board.id,
      boardName: board.name,
    })
    .from(user)
    .innerJoin(boardsToUser, eq(user.id, boardsToUser.userId))
    .innerJoin(board, eq(boardsToUser.boardId, board.id))
    .where(eq(user.authId, currentUser.id))
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  if (!userBoard) {
    return {
      success: false,
      message: "failed to get users board data",
    };
  }

  const ticket = {
    ticketName: response.data.name,
    category: response.data.category,
    start: response.data.start,
    deadline: response.data.end,
    commentary: response.data.comment,
  };

  const insertTicket = await db.insert(tickets).values(ticket).returning();

  const insertedTicket = await db
    .select()
    .from(tickets)
    .where(eq(tickets.ticketName, ticket.ticketName))
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  if (!insertedTicket) {
    return {
      success: false,
      message: "get ticket",
    };
  }

  const insertToUserBoard = await db
    .insert(ticketsToBoards)
    .values({
      ticketId: insertedTicket.id,
      boardId: userBoard.boardId,
    })
    .returning();

  if (!insertToUserBoard.length) {
    return {
      success: false,
      message: "inserting ticket to board incorrect",
    } as const;
  }

  //return result
  return {
    result: insertTicket,
    success: true,
  } as const;
});
