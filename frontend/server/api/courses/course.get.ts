import z from "zod";

const courseGetSchema = z.object({
  studiengang: z.string(),
  kuerzel: z.string(),
});

export default defineEventHandler(async (event) => {
  const response = await getValidatedQuery(event, courseGetSchema.safeParse);

  if (!response.success) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    kuerzel: response.data.kuerzel,
    studiengang: response.data.studiengang,
  };
});
