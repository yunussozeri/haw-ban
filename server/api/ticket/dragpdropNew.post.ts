import { z } from "zod";
import db from "db/db";
import { serverSupabaseUser } from "#supabase/server";
import { board, boardsToUser, tickets, user } from "db/schema";
import { eq, and } from "drizzle-orm";

// Define the enum for valid column names (matching your frontend)
const ColumnEnum = z.enum(["backlog", "todo", "progress", "done"]);

// Zod schema for validating the request body
const dragSchema = z.object({
  ticketId: z.number(),
  newStatus: ColumnEnum,
  from: ColumnEnum,
  to: ColumnEnum,
});

export default defineEventHandler(async (event) => {
  // 1. Validate Request Data
  const parseResult = dragSchema.safeParse(await readBody(event));

  if (!parseResult.success) {
    console.error("Validation Error:", parseResult.error);
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid data" }),
    );
  }

  const { ticketId, newStatus, from, to } = parseResult.data;

  // 2. Check if User is Authenticated
  const currentUser = await serverSupabaseUser(event);
  if (!currentUser) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthorized" }),
    );
  }

  try {
    // 3. (Optional) Check if User has Permission to Modify the Ticket
    //   (You can add logic here to verify if the user is a member of the board
    //    and has the necessary permissions to move the ticket)

    // 4. Update the Ticket Status in the Database
    await db
      .update(tickets)
      .set({ currentColumn: newStatus })
      .where(eq(tickets.id, ticketId));
    console.log("ticketId", ticketId);

    // 5. Send Success Response
    return {
      success: true,
      message: "Ticket status updated successfully",
    };
  } catch (error) {
    console.error("Error updating ticket:", error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: "Internal Server Error" }),
    );
  }
});
