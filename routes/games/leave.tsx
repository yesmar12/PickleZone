import { Handlers } from "$fresh/server.ts";
import { leaveGame } from "../../utils/content.ts";

export const handler: Handlers = {
  async POST(req) {
    const formData = await req.formData();
    const gameId = formData.get("gameId") as string;
    const playerName = formData.get("playerName") as string;

    try {
      const success = await leaveGame(gameId, playerName);
      if (!success) {
        throw new Error("Failed to leave game");
      }

      const url = new URL(req.url);
      return Response.redirect(`${url.origin}/?action=left`);
    } catch (error) {
      const url = new URL(req.url);
      url.searchParams.set("error", "Failed to leave game");
      return Response.redirect(url.toString());
    }
  },
};
