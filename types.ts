// types and interfaces
import type { courses, tickets } from "./server/db/schema";

export type Course = typeof courses.$inferSelect;

export type Ticket = typeof tickets.$inferInsert;
