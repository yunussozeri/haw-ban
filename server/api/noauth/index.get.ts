import db from "~/server/db/db";
import { courses, user } from "~/server/db/schema";

export default eventHandler(async () => {
  const res = await db.select().from(courses);

  console.log(res);
});
