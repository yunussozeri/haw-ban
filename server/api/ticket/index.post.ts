import { z } from "zod";
import db from "db/db";
import { courses } from "db/schema";

const Ticket = z.object({
  name: z.string(),
  start: z.string().date(),
  end: z.string().date(),
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

  console.log(response.data);

  //check valid result
  if (!response.data) {
    return {
      message: "Course does not exist",
      success: false,
    };
  }

  //return result
  return {
    result: response.data,
    success: true,
  };
});
