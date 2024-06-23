import db from "db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { board, boardsToUser, tickets, ticketsToBoards, user } from "db/schema";
import { NuxtError } from "nuxt/app";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

const course = z.object({
  id: z.number(),
  kuerzel: z.string(),
  studiengang: z.string(),
  deadline: z.string().transform((input) => {
    return new Date(input);
  }),
  semester: z.number(),
});

type Course = z.infer<typeof course>;

const courseArray = z.array(course);

const incomingData = z.object({
  userId: z.string(),
  courses: courseArray,
});

interface Ticket {
  ticketName: string;
  start: Date;
  deadline: Date;
}

/**
 *
 * Returns all boards of the given user
 *
 */
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  const incoming = await readValidatedBody(event, incomingData.safeParse);
  //const incoming = await readBody(event);

  // verify passed user id
  if (!session) {
    throw createError({
      statusCode: 401, // unauthorized,
    });
  }

  console.log("validation");
  if (!incoming.success) {
    return {
      success: false,
      message: "failed to get data ",
    };
  }
  console.log("incoming");
  // get users existing board
  const userBoard = await db
    .select({
      boardId: board.id,
      boardName: board.name,
    })
    .from(user)
    .innerJoin(boardsToUser, eq(user.id, boardsToUser.userId))
    .innerJoin(board, eq(boardsToUser.boardId, board.id))
    .where(eq(user.id, incoming.data.userId))
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  if (!userBoard) {
    return {
      success: false,
      message: "failed to get users board data",
    };
  }

  // convert the given courses array into tickets
  const convertCoursesToTickets = incoming.data.courses.map(
    (course: Course): Ticket => {
      return {
        ticketName: course.kuerzel,
        start: new Date(),
        deadline: course.deadline,
      };
    },
  );

  const insertCoursesToTicketsTable = await db
    .insert(tickets)
    .values(convertCoursesToTickets)
    .returning()
    .then((values) => {
      if (!values.length) {
        return undefined;
      }

      return values.map((value) => ({
        ticketId: value.id,
        boardId: userBoard.boardId,
      }));
    });

  const insertTickets = await db
    .insert(ticketsToBoards)
    .values(insertCoursesToTicketsTable ?? [])
    .returning();

  if (!insertTickets.length) {
    return {
      success: false,
      message: "error while inserting tickets",
    };
  }

  // spread operator ...
  return { success: true } as const;
});
