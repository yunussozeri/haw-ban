import db from "@/server/db/db";
import { readFileSync } from "node:fs";
import { z } from "zod";
import { courses } from "@/server/db/schema";

const schema = z.array(
  z.object({
    studiengang: z.string(),
    kuerzel: z.string(),
    deadline: z.string().date(),
  }),
);
export default defineEventHandler(async (event) => {
  const file = readFileSync(
    "C:/Users/yunus/OneDrive/Desktop/SEA2/haw-ban/server/utils/coursereader/b_courses.json",
    {
      encoding: "utf-8",
    },
  );
  const data = JSON.parse(file);
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    console.log(parsed.error.message);
    return;
  }

  // await db.insert(courses).values(parsed.data);
});
