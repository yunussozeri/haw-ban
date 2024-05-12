import db from "@@/server/db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { user } from "~/server/db/schema";
import { serverSupabaseUser } from "#supabase/server";

/*
 * Pattern :
    create zod schema for incoming object
    read from object
    perform operation
    return result
 * 
 * 
 */

const findUserBody = z.object({
  userId: z.string(),
});
/**
 * Returns logged in user
 * @returns the logged in but not registered user
 *
 */
export default defineEventHandler(async (event) => {
  const requestData = await serverSupabaseUser(event);

  // verify passed user
  if (!requestData) {
    throw createError({
      statusCode: 401,
    });
  }

  // find and return user from database
  const result = await db
    .select()
    .from(user)
    .where(eq(user.authId, requestData.id))
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  // if the user is not found return unsuccesfull
  if (!result) {
    return {
      success: false,
    } as const;
  }
  // spread operator ...
  return { result, success: true } as const;
});
