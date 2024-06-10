import { z } from "zod";
import db from "db/db";
import { tickets } from "db/schema";

const Ticket = z.object({
  name: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  category: z.string(),
});

/**
 * Submits a ticket for the user
 *
 * @returns the ticket that is submitted
 *
 */

export default defineEventHandler(async (event) => {
  const response = await readValidatedBody(event, Ticket.safeParse);

  if (!response.success) {
    console.log(response.error);
    return {
      success: false,
    };
  }

  const ticket = {
    ticketName: response.data.name,
    category: response.data.category.toLowerCase(),
    start: Date.parse(response.data.start),
    deadline: Date.parse(response.data.end),
  };

  const insert = await db
    .insert(tickets)
    .values(ticket)
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  //return result
  return {
    result: insert,
    success: true,
  } as const;
});
