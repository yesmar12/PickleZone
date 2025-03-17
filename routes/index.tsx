import { type PageProps, Handlers } from "$fresh/server.ts";
import GameList, { Game } from "../components/GameList.tsx";
import { listGames } from "../utils/content.ts";

interface PageData {
  isAuthenticated: boolean;
  games: Game[];
  success?: boolean;
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const success = url.searchParams.get("success") === "true";
    const isAuthenticated = Boolean(ctx.state.isAuthenticated);
    
    // Fetch games from the database
    const games = await listGames();
    
    return ctx.render({ 
      isAuthenticated, 
      games,
      success
    });
  }
};

export default function Home(props: PageProps<PageData>) {
  const { isAuthenticated, games, success } = props.data;
  
  return (
    <div class="min-h-screen bg-default text-default">
      <div class="p-4 mx-auto max-w-screen-md">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-primary mb-4">PickleZone</h1>
          <p class="text-xl text-secondary">
            Find pickleball games and never play alone
          </p>
        </div>

        <div class="mb-8">
          {success && (
            <div class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Game created successfully!
            </div>
          )}
          
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold text-secondary">
              Upcoming Games
            </h2>
            {isAuthenticated && (
              <a
                href="/games/create"
                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
              >
                Create Game
              </a>
            )}
          </div>
          <GameList games={games} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
}
