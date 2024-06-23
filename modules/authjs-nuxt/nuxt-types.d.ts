import type {
  User as AuthUser,
  Session as AuthSession,
} from "@auth/core/types";
import type { ModuleOptions } from ".";
import "vue-router";

declare module "@nuxt/schema" {
  interface PublicRuntimeConfig {
    authJs: ModuleOptions;
  }
}

declare module "nuxt/schema" {
  interface PublicRuntimeConfig {
    authJs: ModuleOptions;
  }
}

declare module "vue-router" {
  interface RouteMeta {
    auth?: {
      authenticatedRedirectTo?: string;
      guestRedirectTo?: string;
    };
  }
}

declare module "../../node_modules/.pnpm/nuxt@3.11.1_@unocss+reset@0.58.7_drizzle-orm@0.30.4_eslint@8.57.0_floating-vue@5.2.2_typescri_6teyykzc2sypt2ogfc75hwjw4m/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    auth?:
      | {
          authenticatedRedirectTo?: string;
          guestRedirectTo?: string;
        }
      | false;
  }
}

declare module "h3" {
  interface H3EventContext {
    auth: {
      user: User;
      session: Session;
    } | null;
  }
}

export interface Session extends AuthSession {
  user: User;
  expires: string;
}

export interface User extends AuthUser {
  id: string;
  name?: string | undefined;
  email: string;
  image?: string | undefined;
}

export {};
