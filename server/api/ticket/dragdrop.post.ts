import { z } from "zod";
import db from "db/db";
import { board, boardsToUser, tickets, user, categories } from "db/schema";
import { eq, and } from "drizzle-orm";

import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

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
 * Submits a ticket for the usersession
 * @returns the ticket that is submitted
 *
 */

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  if (!session) {
    throw createError({
      statusCode: 401,
    });
  }

  const response = await readValidatedBody(event, dragSchema.safeParse);

  if (!response.success) {
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
    .where(eq(user.id, session.user.id))
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

  await db
    .update(tickets)
    .set({ category: response.data.to })
    .where(and(eq(tickets.id, response.data.ticketId)));

  //return result
  return {
    success: true,
  } as const;
});
