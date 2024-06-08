import db from "db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { board, boardsToUser, user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";

async function getEnumValues(enumName: string): Promise<string[]> {
  const query = `
      SELECT unnest(enum_range(NULL::${enumName}))::text AS value
    `;
  const result = await db.query(query);
  return result.rows.map((row) => row.value);
}

/**
 *
 * Returns all boards of the given user
 *
 */
export default defineEventHandler(async (event) => {
  const userData = await serverSupabaseUser(event);

  // verify passed user id
  if (!userData) {
    throw createError({
      statusCode: 401, // unauthorized,
    });
  }

  const categories = await getEnumValues("categories");

  // if the user is not found return unsuccesfull
  if (!categories) {
    return {
      success: false,
    } as const;
  }
  // spread operator ...
  return { categories, success: true } as const;
});
