import db from "@@/server/db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { user } from "~/server/db/schema";

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

export default defineEventHandler(async (event) => {
  const requestData = await readValidatedBody(event, findUserBody.safeParse);

  // verify passed user id
  if (!requestData.success) {
    throw createError({
      message: "Bad Request : Invalid User Id",
      statusCode: 400,
    });
  }

  // find and return user from database
  const result = await db
    .select()
    .from(user)
    .where(eq(user.authId, requestData.data.userId))
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
