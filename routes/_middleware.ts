import { FreshContext } from "$fresh/server.ts";
import { log } from "../utils/logger.ts";
import { getSessionId } from "jsr:@deno/kv-oauth";

export async function handler(
  req: Request,
  ctx: FreshContext
) {
  // Check authentication status
  const sessionId = await getSessionId(req);
  ctx.state.isAuthenticated = sessionId !== undefined;
  
  const url = new URL(req.url);
  const startTime = Date.now();

  // Log the request
  await log({
    action: "request",
    entityType: "server",
    entityId: url.pathname,
    success: true,
    details: {
      method: req.method,
      path: url.pathname,
      query: Object.fromEntries(url.searchParams.entries()),
      timestamp: new Date().toISOString(),
    },
  });

  // Process the request
  const response = await ctx.next();

  // Log the response time
  const duration = Date.now() - startTime;
  await log({
    action: "response",
    entityType: "server",
    entityId: url.pathname,
    success: response.ok,
    details: {
      method: req.method,
      path: url.pathname,
      status: response.status,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    },
  });

  return response;
}
