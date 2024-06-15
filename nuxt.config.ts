// https://nuxt.com/docs/api/configuration/nuxt-config
import env from "./server/utils/env";
import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxt/eslint",
    "nuxt-typed-router",
    "@nuxt/image",
  ],
  devtools: { enabled: true },
  supabase: {
    url: env.SUPABASE_URL,
    key: env.SUPABASE_ANON_KEY,
    redirect: false,
    redirectOptions: {
      login: "/",
      //TODO: give base url (http://localhost:3000/) as env var,
      callback: "http://localhost:3000/board",
    },
  },
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
});
