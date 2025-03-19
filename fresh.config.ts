import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import oauth from "./plugins/kv_oauth.ts";
import { getCookieSessionPlugin } from "https://deno.land/x/fresh_session@beta-0.3.0/mod.ts";


export default defineConfig({
  plugins: [tailwind(),oauth, getCookieSessionPlugin("/") ],
});
