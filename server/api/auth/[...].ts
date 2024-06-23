import GithubProvider from "@auth/core/providers/github";
import type { AuthConfig } from "@auth/core";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NuxtAuthHandler } from "#auth";
import {
  accounts as accountsTable,
  users as usersTable,
  verificationTokens as verificationTokensTable,
  sessions as sessionsTable,
  authenticators as authenticatorsTable,
} from "db/schema";
import db from "db/db";

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
} satisfies AuthConfig;

export default NuxtAuthHandler(authOptions, runtimeConfig);
