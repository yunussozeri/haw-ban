// db schema
import {
  date,
  integer,
  index,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

// pnpm db:generate to create sql queries, db:push to push queries to supase
export const user = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    fullName: text("full_name"),
    email: varchar("email", { length: 256 }),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.fullName),
      emailIdx: uniqueIndex("email_idx").on(table.email),
    };
  }
);

export const kanbancolumn = pgEnum("kanbancolumn", [
  "backlog",
  "todo",
  "progress",
  "done",
]);

export const table = pgTable("table", {
  kanbancolumn: kanbancolumn("kanbancolumn"),
});

export const category = pgTable("category", {
  id: serial("id"),
  categoryName: varchar("category_name", { length: 128 }),
});

export const tickets = pgTable(
  "tickets",
  {
    id: serial("id").primaryKey(),
    boardId: serial("board_id")
      .references(() => board.boardId)
      .notNull(),
    ticketName: text("ticket_name"),
    categoryId: serial("category_id").references(() => category.id),
    start: date("start"),
    deadline: date("deadline"),
  },
  (table) => {
    return {
      ticketIdx: index("ticket_name_idx").on(table.ticketName),
    };
  }
);

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  commentId: serial("comment_id"),
  ticketId: numeric("ticket_id").notNull(),
  comment: varchar("comment", { length: 256 }),
});

export const board = pgTable("board", {
  boardId: serial("board_id").primaryKey(),
  ownerId: serial("owner_id").references(() => user.id),
});

export const boardsToUser = pgTable(
  "boards_to_user",
  {
    userId: integer("user_id"),
    boardId: integer("board_id"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.boardId] }),
      boards_to_user: primaryKey({
        name: "boards_to_user_pk",
        columns: [table.userId, table.boardId],
      }),
    };
  }
);

export const ticketsToBoards = pgTable(
  "tickets_to_board",
  {
    boardId: integer("book_id"),
    ticketId: integer("ticket_id"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.boardId, table.ticketId] }),
      boards_to_user: primaryKey({
        name: "tickets_to_board_pk",
        columns: [table.boardId, table.ticketId],
      }),
    };
  }
);

export const commentsToTicket = pgTable(
  "comments_to_ticket",
  {
    ticketId: integer("ticket_id"),
    commentId: integer("book_id"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.ticketId, table.commentId] }),
      boards_to_user: primaryKey({
        name: "comments_to_ticket_pk",
        columns: [table.ticketId, table.commentId],
      }),
    };
  }
);
