// https://nuxt.com/docs/api/configuration/nuxt-config
import env from "./server/utils/env";
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/eslint", "nuxt-typed-router", "@nuxt/image"],
  devtools: { enabled: true },
  routeRules: {},
  ui: {
    icons: ["mdi", "material-symbols"],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        noUncheckedIndexedAccess: true,
      },
    },
  },
  nitro: {
    typescript: {
      tsConfig: {
        compilerOptions: {
          noUncheckedIndexedAccess: true,
        },
      },
    },
    alias: { db: fileURLToPath(new URL("./server/db", import.meta.url)) },
  },
  alias: {
    db: fileURLToPath(new URL("./server/db", import.meta.url)),
    cookie: "cookie",
  },
  runtimeConfig: {
    authJs: {
      secret: env.AUTH_SECRET, // You can generate one with `openssl rand -base64 32`
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: env.AUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
      },
    },
  },
});
