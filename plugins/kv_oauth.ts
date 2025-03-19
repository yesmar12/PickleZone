import type { Plugin, FreshContext } from "$fresh/server.ts";
import "$std/dotenv/load.ts";
import { createAuth0OAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";

const { signIn, handleCallback, signOut } = createHelpers(
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
      async handler(_req: Request) {
        return await signIn(_req);
      },
    },
    {
      path: "/callback",
      async handler(req: Request, ctx: FreshContext) {
        const { response, tokens } = await handleCallback(req);

        const userInfoResponse = await fetch(
          `https://${Deno.env.get("AUTH0_DOMAIN")}/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        const userInfo = await userInfoResponse.json();
        
        const user = {
          id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture
        }

        const {session} = ctx.state;
        session.set("user", user);
        
        return response;
      },
    },
    {
      path: "/logout",
      async handler(_req: Request) {
        const { session } = ctx.state;
        session.destroy();
        return await signOut(_req);
      },
    },
  ]
} as Plugin;
