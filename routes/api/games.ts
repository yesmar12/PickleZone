import { Handlers } from "$fresh/server.ts";
import { createGame, deleteGame, joinGame, updateGame } from "../../utils/content.ts";

export const handler: Handlers = {
  async POST(req) {
    let action: string;
    let data: any;
    
    // Check content type and parse accordingly
    const contentType = req.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const jsonData = await req.json();
      action = jsonData.action;
      data = jsonData.data || jsonData;
    } else if (contentType?.includes('multipart/form-data') || 
               contentType?.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      action = formData.get('action') as string;
      data = {
        time: formData.get('time') as string,
        court: formData.get('court') as string,
        players: formData.get('players') ? JSON.parse(formData.get('players') as string) : [],
        maxPlayers: parseInt(formData.get('maxPlayers') as string),
        id: formData.get('id') as string,
        gameId: formData.get('gameId') as string,
        playerName: formData.get('playerName') as string
      };
    } else {
      return new Response(JSON.stringify({ error: "Unsupported content type" }), {
        status: 415
      });
    }

    try {
      switch (action) {
        case "createGame": {
          const game = {
            time: data.time,
            court: data.court,
            players: [],
            maxPlayers: data.maxPlayers,
          };
          const gameId = await createGame(game);
          return new Response(JSON.stringify({ success: true, gameId }));
        }

        case "updateGame": {
          const game = {
            time: data.time,
            court: data.court,
            players: data.players,
            maxPlayers: data.maxPlayers,
          };
          const success = await updateGame(data.id, game);
          return new Response(JSON.stringify({ success }));
        }

        case "deleteGame": {
          await deleteGame(data.id);
          return new Response(JSON.stringify({ success: true }));
        }

        case "joinGame": {
          const success = await joinGame(
            data.gameId,
            data.playerName
          );
          return new Response(JSON.stringify({ success }));
        }

        default:
          return new Response(JSON.stringify({ error: "Invalid action" }), {
            status: 400,
          });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal server error";
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: 500 }
      );
    }
  },
};
