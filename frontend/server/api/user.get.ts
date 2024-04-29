import z from "zod";

const userGetSchema = z.object({
  userid: z.coerce.number(),
  email: z.string().email(),
});

export default eventHandler((event) => {
  const { userid, email } = getQuery(event);

  try {
    userGetSchema.parse({ userid, email });
    // If validation passes, return validation = true along with userId and email
    return {
      validation: true,
      userid,
      email,
    };
  } catch (error) {
    // If validation fails, return validation = false along with an error message
    return {
      validation: false,
      message: error.message + " Zort",
    };
  }
});
