import { defineConfig } from "drizzle-kit";
import env from "./server/utils/env";

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.NEW_DB_URL,
  },
  introspect: {
    casing: "camel",
  },
});
