import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

interface CreateGameData {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
}

// Sample courts for selection
const courts = ["Court 1", "Court 2", "Court 3", "Court 4"];

export const handler: Handlers<CreateGameData> = {
  GET(req, ctx) {
    const isAuthenticated = Boolean(ctx.state.isAuthenticated);
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
      const url = new URL(req.url);
      return Response.redirect(`${url.origin}/`);
    }
    
    return ctx.render({ isAuthenticated });
  },
  
  async POST(req, ctx) {
    const isAuthenticated = Boolean(ctx.state.isAuthenticated);
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
      const url = new URL(req.url);
      return Response.redirect(`${url.origin}/`);
    }
    
    try {
      const formData = await req.formData();
      const court = formData.get("court") as string;
      const date = formData.get("date") as string;
      const time = formData.get("time") as string;
      const maxPlayers = parseInt(formData.get("maxPlayers") as string);
      
      // Validate inputs
      if (!court || !date || !time || isNaN(maxPlayers)) {
        return ctx.render({ 
          isAuthenticated, 
          error: "All fields are required" 
        });
      }
      
      // Create ISO datetime string
      const dateTime = new Date(`${date}T${time}`).toISOString();
      
      // Call the API to create the game
      const apiUrl = new URL(req.url);
      apiUrl.pathname = "/api/games";
      
      const response = await fetch(apiUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createGame",
          data: {
            court,
            time: dateTime,
            maxPlayers,
            players: [], // Start with empty players array
          },
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Failed to create game");
      }
      
      // Redirect to home page after successful creation
      const url = new URL(req.url);
      return Response.redirect(`${url.origin}/?success=true`);
    } catch (error) {
      return ctx.render({ 
        isAuthenticated, 
        error: "Failed to create game" 
      });
    }
  }
};

export default function CreateGamePage({ data }: PageProps<CreateGameData>) {
  const { isAuthenticated, error } = data;
  
  return (
    <>
      <Head>
        <title>Create Game - PickleZone</title>
      </Head>
      <div class="min-h-screen bg-default text-default">
        <div class="p-4 mx-auto max-w-screen-md">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-primary mb-4">Create New Game</h1>
            <p class="text-secondary">
              Fill out the form below to create a new pickleball game.
            </p>
          </div>
          
          {error && (
            <div class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form method="POST" class="space-y-6">
            <div>
              <label class="block text-secondary font-medium mb-2" for="court">
                Court
              </label>
              <select
                id="court"
                name="court"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a court</option>
                {courts.map((court) => (
                  <option key={court} value={court}>
                    {court}
                  </option>
                ))}
              </select>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-secondary font-medium mb-2" for="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div>
                <label class="block text-secondary font-medium mb-2" for="time">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div>
              <label class="block text-secondary font-medium mb-2" for="maxPlayers">
                Maximum Players
              </label>
              <input
                type="number"
                id="maxPlayers"
                name="maxPlayers"
                min="2"
                max="8"
                value="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div class="flex justify-between">
              <a
                href="/"
                class="px-4 py-2 border border-gray-300 text-secondary rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </a>
              <button
                type="submit"
                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
              >
                Create Game
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
