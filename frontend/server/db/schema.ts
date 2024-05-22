// db schema
import {
  date,
  integer,
  index,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  uniqueIndex,
  varchar,
  uuid,
  timestamp,
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
    authId: uuid("auth_id").notNull(),
    fullName: text("full_name"),
  },
  (table) => {
    return {
      authIdIdx: uniqueIndex("auth_id_idx").on(table.authId),
      nameIdx: index("name_idx").on(table.fullName),
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
  id: serial("id").primaryKey().notNull(),
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
    id: serial("id").notNull().primaryKey(),
    ticketName: text("ticket_name"),
    categoryId: integer("category_id").references(() => category.id),
    start: date("start"),
    deadline: date("deadline"),
    currentColumn: kanbancolumn("current_column").default("backlog"),
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
  id: serial("id").notNull().primaryKey(),
  comment: varchar("comment", { length: 256 }),
});

/**
 * Represents the boards in the KanBan-Board
 *
 * PK: (userId,boardId)
 *
 * Columns:
 *  userId  : is the user id, part of primary key
 *  boardId : is the board id, part of primary key
 *
 */
export const board = pgTable("board", {
  id: serial("id").notNull().primaryKey(),
});

export const courses = pgTable("courses", {
  id: serial("id").notNull().primaryKey(),
  kuerzel: varchar("kuerzel", { length: 30 }),
  studiengang: varchar("studiengang", { length: 8 }),
  deadline: date("deadline"),
});

/**
 * PK Relation for Boards and Users
 *
 */
export const boardsToUser = pgTable(
  "boards_to_user",
  {
    userId: integer("user_id").references(() => user.id),
    boardId: integer("board_id").references(() => board.id),
  },
  (table) => {
    return {
      boards_to_user: primaryKey({
        name: "boards_to_user_pk",
        columns: [table.userId, table.boardId],
      }),
    };
  }
);

/**
 * PK Relation for tickets and boards
 *
 */
export const ticketsToBoards = pgTable(
  "tickets_to_board",
  {
    boardId: integer("board_id").references(() => board.id),
    ticketId: integer("ticket_id").references(() => tickets.id),
  },
  (table) => {
    return {
      boards_to_user: primaryKey({
        name: "tickets_to_board_pk",
        columns: [table.boardId, table.ticketId],
      }),
    };
  }
);

/**
 * PK Relation for comments and tickets.
 *
 *
 */
export const commentsToTicket = pgTable(
  "comments_to_ticket",
  {
    ticketId: integer("ticket_id").references(() => tickets.id),
    commentId: integer("board_id").references(() => comments.id),
  },
  (table) => {
    return {
      boards_to_user: primaryKey({
        name: "comments_to_ticket_pk",
        columns: [table.ticketId, table.commentId],
      }),
    };
  }
);