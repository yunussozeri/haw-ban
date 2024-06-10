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
 * Returns all courses for given studiengang and semester
 *
 * @returns courses of studiengang and semester
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

  const insert = await db.insert(tickets).values({
    ticketName: response.data.name,
    category: response.data.category.toLowerCase(),
    start: response.data.start,
    deadline: response.data.end,
  });

  //return result
  return {
    result: insert,
    success: true,
  };
});
