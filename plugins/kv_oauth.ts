import type { Plugin, FreshContext } from "$fresh/server.ts";

import "$std/dotenv/load.ts";

import { createAuth0OAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";
const { signIn, handleCallback, signOut, getSessionId } = createHelpers(
  createAuth0OAuthConfig({
    redirectUri: Deno.env.get("AUTH0_CALLBACK_URL") || "",
    scope: "openid profile email",
  })
);


export default {
  name: "oauth",
  routes: [
    {
      path: "/login",
      async handler(_req: Request, _ctx: FreshContext) {
        return await signIn(_req);
      },
    },
    {
      path: "/callback",
      async handler(req: Request, _ctx: FreshContext) {
        const { response, tokens } = await handleCallback(req);
        return response;
      },
    },
    {
      path: "/logout",
      async handler(_req: Request, _ctx: FreshContext) {
        return await signOut(_req);
      },
    },
  ],
  middlewares: [
    {
      path: "/manage",
      middleware: {
        async handler(req: Request, ctx: FreshContext) {
          return (await getSessionId(req)) === undefined
            ? new Response("Unauthorized", { status: 401 })
            : new Response("You are allowed");
        },
      },
    },
  ],
} as Plugin;
