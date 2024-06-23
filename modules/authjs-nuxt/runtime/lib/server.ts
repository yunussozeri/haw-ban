import type { RuntimeConfig } from "nuxt/schema";
import { Auth, skipCSRFCheck } from "@auth/core";
import { eventHandler, getRequestHeaders, getRequestURL } from "h3";
import type { H3Event } from "h3";
import type { AuthConfig } from "@auth/core";
import { getToken } from "@auth/core/jwt";
import {
  checkOrigin,
  getAuthJsSecret,
  getRequestFromEvent,
  makeCookiesFromCookieString,
} from "../utils";
// import type { WSRequest } from "crossws";
import type { Session } from "../../nuxt-types";

if (!globalThis.crypto) {
  console.log("Polyfilling crypto...");
  import("node:crypto").then((crypto) => {
    Object.defineProperty(globalThis, "crypto", {
      value: crypto.webcrypto,
      writable: false,
      configurable: true,
    });
  });
}

/**
 * This is the event handler for the catch-all route.
 * Everything can be customized by adding a custom route that takes priority over the handler.
 * @param options AuthConfig
 * @param runtimeConfig RuntimeConfig
 * @returns EventHandler
 */
export function NuxtAuthHandler(
  options: AuthConfig,
  runtimeConfig: RuntimeConfig,
) {
  return eventHandler(async (event) => {
    options.trustHost ??= true;
    options.skipCSRFCheck = skipCSRFCheck;
    const request = await getRequestFromEvent(event);
    if (request.url.includes(".js.map")) return; // Do not handle source maps
    checkOrigin(request, runtimeConfig);
    const response = await Auth(request, options);
    return response;
  });
}

/**
 * Get and returns the session.
 * @param event H3Event or WSRequest
 * @param options AuthConfig
 * @returns Session
 */
export async function getServerSession(
  event: H3Event,
  options: AuthConfig,
): Promise<Session | null> {
  const response = await getServerSessionResponse(event, options);

  const { status = 200 } = response;
  const data = await response.json();

  if (!data || !Object.keys(data).length) return null;
  if (status === 200) return data;
  throw new Error(data.message);
}

/**
 * Returns the JWT Token.
 * @param event H3Event
 * @param options AuthConfig
 * @returns JWT Token
 */
export async function getServerToken(event: H3Event, options: AuthConfig) {
  const response = await getServerSessionResponse(event, options);
  const secureCookie = response.url.startsWith("https://");

  const cookies = Object.fromEntries(response.headers.entries());
  const parsedCookies = makeCookiesFromCookieString(cookies["set-cookie"]);
  const parameters = {
    req: {
      cookies: parsedCookies,
      headers: response.headers as unknown as Record<string, string>,
    },
    // see https://github.com/nextauthjs/next-auth/blob/a79774f6e890b492ae30201f24b3f7024d0d7c9d/packages/core/src/jwt.ts
    secureCookie,
    secret: getAuthJsSecret(options),
  };
  // @ts-expect-error -- salt seems as required even though it is provided internally
  return getToken(parameters);
}

async function getServerSessionResponse(event: H3Event, options: AuthConfig) {
  const headers = getRequestHeaders(event) as HeadersInit;
  let url = getRequestURL(event);

  options.trustHost ??= true;

  // see https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
  // const F = new URL("/articles", "https://developer.mozilla.org/api/v1/");
  // => 'https://developer.mozilla.org/articles'
  url = new URL("/api/auth/session", url);
  return Auth(new Request(url, { headers: headers }), options);
}
