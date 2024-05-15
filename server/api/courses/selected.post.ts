import { and, eq } from "drizzle-orm";
import z from "zod";
import db from "db/db";
import { courses } from "db/schema";

const courseSchema = z.object({
  kuerzel: z.string(),
  studiengang: z.string(),
});

const courseArraySchema = z.array(courseSchema);

export default defineEventHandler(async (event) => {
  const request = await readValidatedBody(event, courseArraySchema.safeParse);

  if (!request.success) {
    return {
      message: "",
      error: 422,
    };
  }
});
