import { number, z } from "zod";
import db from "db/db";
import { user } from "~/server/db/schema";
import { eq, max } from "drizzle-orm";

const RegistrationSchema = z.object({
  authId: z.string(),
  fullName: z.string(),
});

type userType = typeof user.$inferInsert;

export default defineEventHandler(async (event) => {
  const requestData = await readValidatedBody(
    event,
    RegistrationSchema.safeParse
  );

  if (!requestData.success) {
    throw createError({
      message: "Bad Request : Invalid User Data Input",
      statusCode: 400,
    });
  }

  const insertUser = async (newUser: userType) => {
    return db
      .insert(user)
      .values(newUser)
      .returning({ insertedUserFullName: user.fullName });
  };
  /*
  const newincomingUserId = await db
    .select()
    .from(user)
    .where(eq(user.id, max(user.id)))
    .then((values) => {
      if (!values[0]) {
        return 0;
      }
      return values[0].id;
    }); */

  const newUser: userType = {
    authId: requestData.data.authId,
    fullName: requestData.data.fullName,
  };

  const result = await insertUser(newUser);

  // if inserting user is not possible
  if (!result) {
    return { success: false } as const;
  }

  return { result, success: true } as const;
});
