import { defineConfig } from "drizzle-kit";
import env from "./server/utils/env";

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DB_URL,
  },
  introspect: {
    casing: "camel",
  },
});