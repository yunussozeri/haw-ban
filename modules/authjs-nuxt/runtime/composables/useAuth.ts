import type { Session } from "../../nuxt-types";
import { produce } from "immer";
import { computed, readonly, watch } from "vue";
import { getProviders, signIn, signOut } from "../lib/client";

export function useAuth() {
  const session = useState<Session | null>("auth:session", () => null);
  const cookies = useState<Record<string, string> | null>(
    "auth:cookies",
    () => ({}),
  );
  const status = useState<
    "loading" | "authenticated" | "unauthenticated" | "error"
  >("auth:session:status", () => "unauthenticated");
  const sessionToken = computed(
    () => cookies.value?.["next-auth.session-token"] ?? "",
  );
  const user = computed(() => session.value?.user ?? null);
  watch(session, (newSession) => {
    if (newSession === null) return (status.value = "unauthenticated");
    if (Object.keys(newSession).length) return (status.value = "authenticated");
  });

  const updateSession = (u: (() => unknown) | Session | null) => {
    session.value = typeof u === "function" ? produce(session.value, u) : u;
  };

  const removeSession = () => {
    cookies.value = null;
    updateSession(null);
  };

  return {
    session: readonly(session),
    user,
    updateSession,
    status,
    cookies,
    sessionToken,
    removeSession,
    signIn,
    signOut,
    getProviders,
  };
}
