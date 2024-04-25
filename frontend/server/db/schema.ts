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

/**
 * Represents the user table
 *
 * Table Name : User
 *
 * PK : id
 *
 * Columns:
 *  id  : is the unique identifier for the user
 *  fullName  : is the users full name
 *  email : is the users email adress
 *
 * Indexes:
 *  nameIdx : indexes fullName
 *  emailIdx  : indexes email
 *
 */
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

/**
 * Enum representing the kanban columns
 *
 * Keys:
 *   backlog,
 *   todo,
 *   progress,
 *   done,
 *
 */
export const kanbancolumn = pgEnum("kanbancolumn", [
  "backlog",
  "todo",
  "progress",
  "done",
]);

export const table = pgTable("table", {
  kanbancolumn: kanbancolumn("kanbancolumn"),
});

/**
 * Represents the category which the ticket is assined to
 *
 * PK: id
 *
 * Columns:
 *  id  : is the unique identifier for category
 *  categoryName  : is the name of the category
 *
 */
export const category = pgTable("category", {
  id: serial("id").primaryKey().notNull().default(31),
  categoryName: varchar("category_name", { length: 128 }),
});

/**
 * Represents the tickets on the KanBan-Board
 *
 * PK: (boardId,ticketId)
 *
 * Columns:
 *  boardId : references the board which the ticket belongs to, part of primary key
 *  ticketId  : is the identifier of the ticket, part of primary key
 *  ticketName  : is the name of the ticket
 *  categoryId  : is the category of the ticket
 *  start : is the start date of the ticket
 *  deadline : is the deadline of the ticket
 *  lastColumn  : is the last column where the ticket was assigned to
 *
 * Indexes:
 *  ticketIdx : index on the ticket names
 */
export const tickets = pgTable(
  "tickets",
  {
    //id: serial("id").primaryKey(),
    boardId: serial("board_id")
      .references(() => board.boardId)
      .notNull(),
    ticketId: serial("ticket_id").notNull(),
    ticketName: text("ticket_name"),
    categoryId: serial("category_id").references(() => category.id),
    start: date("start"),
    deadline: date("deadline"),
    lastColumn: kanbancolumn("last_column"),
  },
  (table) => {
    return {
      ticketIdx: index("ticket_name_idx").on(table.ticketName),
    };
  }
);

/**
 * Represents the tickets attached to a ticket
 *
 * PK: (ticketId,commentId)
 *
 * Columns:
 *  ticketId  : references the ticket which the comment is attached to, part of primary key
 *  commentId : is the identifier of the comment, part of primary key
 *  comment : is the comment text
 */
export const comments = pgTable("comments", {
  //id: serial("id").primaryKey(),
  ticketId: numeric("ticket_id")
    .notNull()
    .references(() => user.id)
    .notNull(),
  commentId: serial("comment_id").notNull(),
  comment: varchar("comment", { length: 256 }),
});

/**
 * Represents the boards in the KanBan-Board
 *
 * PK: (userId,boardId)
 *
 * Columns:
 *  userId  :
 *  boardId :
 *
 */
export const board = pgTable("board", {
  userId: serial("user_id")
    .references(() => user.id)
    .notNull(),
  boardId: serial("board_id").notNull(),
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
