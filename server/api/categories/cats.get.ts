import db from "db/db";
import { sql } from "drizzle-orm";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

async function getEnumValues(enumName: string): Promise<string[]> {
  const query = sql`
      SELECT unnest(enum_range(NULL::${enumName}))::text AS value
    `;
  const result = (await db.execute(query)) as unknown as {
    rows: { value: "uni" | "freizeit" | "hobby" | "sport" | "default" }[];
  };
  return result.rows.map((row) => row.value);
}

/**
 *
 * Returns all boards of the given user
 *
 */
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  // verify passed user id
  if (!session) {
    throw createError({
      statusCode: 401, // unauthorized,
    });
  }

  const categories = await getEnumValues("categories");

  // if the categories is not found return unsuccesfull
  if (!categories) {
    return {
      success: false,
    } as const;
  }

  return { categories, success: true } as const;
});
