import db from "db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { board, boardsToUser, tickets, user } from "db/schema";
import { serverSupabaseUser } from "#supabase/server";
/*
 * Pattern :
    create zod schema for incoming object
    read from object
    perform operation
    return result

 * 
 * 
 */

const course = z.object({
  id: z.number(),
  kuerzel: z.string(),
  studiengang: z.string(),
  deadline: z.date(),
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

const transformCourseToTicket = (course: Course): Ticket => {
  return {
    ticketName: course.kuerzel,
    start: new Date(),
    deadline: course.deadline,
  };
};

const transformCourses = (courses: Course[]): Ticket[] => {
  return courses.map(transformCourseToTicket);
};

/**
 *
 * Returns all boards of the given user
 *
 */
export default defineEventHandler(async (event) => {
  const userData = await serverSupabaseUser(event);

  const incoming = await readValidatedBody(event, incomingData.safeParse);

  // verify passed user id
  if (!userData) {
    throw createError({
      statusCode: 401, // unauthorized,
    });
  }

  if (!incoming.success) {
    return {
      succes: false,
      message: "failed to get data ",
    };
  }

  // get users name, surname and id
  const userName = await db
    .select({
      id: user.id,
      name: user.name,
      surname: user.surname,
    })
    .from(user)
    .where(eq(user.authId, incoming.data.userId))
    .then((value) => {
      if (!value[0]) {
        return undefined;
      }
      return value[0];
    });

  if (!userName) {
    return {
      success: false,
      message: "failed to get user data",
    };
  }

  const newBoardName = userName.name
    .concat(" ")
    .concat(userName.surname)
    .concat("'s Board");

  const newBoard = await db
    .insert(board)
    .values({
      name: newBoardName,
    })
    .returning();

  if (newBoard[0] == undefined) {
    return {
      success: false,
      message: "error after creating board",
    };
  }

  const joinWithUser = await db
    .insert(boardsToUser)
    .values({
      userId: userName.id,
      boardId: newBoard[0].id,
    })
    .returning();

  // at this point the board is created and we have the board Id

  // convert the given courses array into tickets
  const convertCoursesToTickets = transformCourses(incoming.data.courses);
  const insertCoursesToTicketsTable = await db
    .insert(tickets)
    .values(convertCoursesToTickets);

  // spread operator ...
  return { success: true } as const;
});
