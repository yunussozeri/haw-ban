import { getServerSession } from "#auth";
import type { Session, User } from "@@/modules/authjs-nuxt/nuxt-types";
import { authOptions } from "@/server/api/auth/[...]";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  // console.log("session", session);
  event.context.auth =
    session ?
      ({ user: session.user, session } as {
        user: User;
        session: Session;
      })
    : null;
});
