import GithubProvider from "@auth/core/providers/github";
import type { AuthConfig } from "@auth/core";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NuxtAuthHandler } from "#auth";
import {
  accounts as accountsTable,
  user as usersTable,
  verificationTokens as verificationTokensTable,
  sessions as sessionsTable,
  authenticators as authenticatorsTable,
  board,
  boardsToUser,
} from "db/schema";
import db from "db/db";
import { eq } from "drizzle-orm";

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig();

// Refer to Auth.js docs for more details
export const authOptions = {
  secret: env.AUTH_SECRET,
  basePath: "/api/auth",
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "database",
  },
  adapter: DrizzleAdapter(db, {
    usersTable,
    accountsTable,
    sessionsTable,
    authenticatorsTable,
    verificationTokensTable,
  }),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session }) {
      return {
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
        expires: session.expires?.toISOString?.() ?? session.expires,
      };
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      console.log("Comes here to sign in :d");
      if (isNewUser) {
        const newBoardName = user.name!.concat("'s Board");

        const newBoard = await db
          .insert(board)
          .values({
            name: newBoardName,
          })
          .returning()
          .then((value) => value[0]);
        console.log("create board");
        if (newBoard == undefined) {
          throw new Error("error after creating board");
        }

        await db
          .insert(boardsToUser)
          .values({
            userId: user.id,
            boardId: newBoard.id,
          })
          .returning();
      } else {
        const boardName = user.name!.concat("'s Board");

        const existingBoard = await db
          .select()
          .from(board)
          .where(eq(board.name, boardName));

        if (!existingBoard.length) {
          const newBoard = await db
            .insert(board)
            .values({
              name: boardName,
            })
            .returning()
            .then((value) => value[0]);
          console.log("create board somehow");
          if (newBoard == undefined) {
            throw new Error("error after creating board");
          }

          await db
            .insert(boardsToUser)
            .values({
              userId: user.id,
              boardId: newBoard.id,
            })
            .returning();
        }
      }
    },
  },
} satisfies AuthConfig;

export default NuxtAuthHandler(authOptions, runtimeConfig);
