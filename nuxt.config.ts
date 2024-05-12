// https://nuxt.com/docs/api/configuration/nuxt-config
import env from "./server/utils/env";

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
    redirectOptions: {
      login: "/",
      callback: "/confirm",
      include: undefined,
      exclude: ["/board/*", "/login", "/register"],
      cookieRedirect: false,
    },
  },
  // nitro: {alias: { "db/*": "../server/db/*" },},
  routeRules: {},
  ui: {
    icons: ["mdi"],
  },
});
