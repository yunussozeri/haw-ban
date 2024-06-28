// db connection
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = env.NEW_DB_URL;
console.log("Connection : ", connectionString);

const client = postgres(connectionString);
const db = drizzle(client);

export default db;
