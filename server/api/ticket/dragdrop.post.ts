import { z } from "zod";
import db from "db/db";
import { serverSupabaseUser } from "#supabase/server";
import { board, boardsToUser, tickets, user, categories } from "db/schema";
import { eq, and } from "drizzle-orm";

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

const dragSchema = z.object({
  ticketId: z.number(),
  from: Property,
  to: Property,
});
/**
 * Submits a ticket for the user
 *
 * @returns the ticket that is submitted
 *
 */

export default defineEventHandler(async (event) => {
  const response = await readValidatedBody(event, dragSchema.safeParse);

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

  const dragAndDrop = await db
    .update(tickets)
    .set({ category: response.data.to })
    .where(and(eq(tickets.id, response.data.ticketId)));

  const draggedAndDropped = await db
    .select({ ticketId: tickets.id, category: tickets.category })
    .from(tickets)
    .where(eq(tickets.id, response.data.ticketId));

  if (!draggedAndDropped.length) {
    return {
      success: false,
      message: "cannot drag and drop atm sus",
    };
  }

  //return result
  return {
    success: true,
  } as const;
});
