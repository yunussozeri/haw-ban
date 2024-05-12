// db connection
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString:string = process.env.DB_URL as string;

const client = postgres(connectionString);
const db = drizzle(client, {
  schema,
});

export default db;