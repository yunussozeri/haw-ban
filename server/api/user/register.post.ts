import { z } from "zod";
import db from "db/db";
import { user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";

const RegistrationSchema = z.object({
  name: z.string(),
  surname: z.string(),
});

export default defineEventHandler(async (event) => {
  const userData = await serverSupabaseUser(event);

  // verify passed user
  if (!userData) {
    throw createError({
      statusCode: 401,
    });
  }

  const requestData = await readValidatedBody(
    event,
    RegistrationSchema.safeParse,
  );

  if (!requestData.success) {
    throw createError({
      message: "Bad Request : Invalid User Data Input",
      statusCode: 400,
    });
  }

  const result = await db.insert(user).values({
    authId: userData.id,
    name: requestData.data.name,
    surname: requestData.data.surname,
  });

  // if inserting user is not possible
  if (!result) {
    return { success: false } as const;
  }

  return { result: requestData.data, success: true } as const;
});
