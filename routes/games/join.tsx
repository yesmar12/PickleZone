import { Handlers } from "$fresh/server.ts";
import { joinGame } from "../../utils/content.ts";

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const gameId = formData.get("gameId") as string;
    const playerName = formData.get("playerName") as string;

    try {
      const success = await joinGame(gameId, playerName);
      if (!success) {
        throw new Error("Failed to join game");
      }

      // Redirect to home page with success parameter
      const url = new URL(req.url);
      return Response.redirect(`${url.origin}/?action=joined`);
    } catch (error) {
      const url = new URL(req.url);
      url.searchParams.set("error", "Failed to join game");
      return Response.redirect(url.toString());
    }
  },
};
