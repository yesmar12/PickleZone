import { JSX } from "preact";

export interface Game {
  id: string;
  time: string;
  players: string[];
  court: string;
  maxPlayers: number;
}

interface GameListProps {
  games: Game[];
  isAuthenticated?: boolean;
}

export default function GameList({ games, isAuthenticated = false }: GameListProps): JSX.Element {
  // Format date to display in a readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div class="space-y-4">
      {games.length === 0 ? (
        <div class="text-center p-8 bg-gray-50 rounded-lg">
          <p class="text-gray-500">No upcoming games scheduled.</p>
        </div>
      ) : (
        games.map((game) => (
          <div key={game.id} class="border-2 border-primary rounded-lg p-6 hover:bg-primary/5 transition-colors">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-semibold text-secondary">{game.court}</h3>
                <p class="text-tertiary">{formatDate(game.time)}</p>
              </div>
              <div class="text-right">
                <p class="text-tertiary">
                  <span class="font-semibold">{game.players.length}</span> / {game.maxPlayers} players
                </p>
              </div>
            </div>
            
            <div class="mt-4">
              <h4 class="text-sm font-medium text-tertiary mb-2">Players:</h4>
              <div class="flex flex-wrap gap-2">
                {game.players.map((player) => (
                  <span class="px-3 py-1 bg-primary/10 rounded-full text-sm text-secondary">
                    {player}
                  </span>
                ))}
              </div>
            </div>
            
            {isAuthenticated && (
              <div class="mt-4 flex justify-end">
                {game.players.includes("Current User") ? (
                  <form method="POST" action="/games/leave">
                    <input type="hidden" name="gameId" value={game.id} />
                    <input type="hidden" name="playerName" value="Current User" />
                    <button 
                      type="submit"
                      class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Leave Game
                    </button>
                  </form>
                ) : (
                  <form method="POST" action="/games/join">
                    <input type="hidden" name="gameId" value={game.id} />
                    <input type="hidden" name="playerName" value="Current User" />
                    <button 
                      type="submit"
                      class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={game.players.length >= game.maxPlayers}
                    >
                      {game.players.length >= game.maxPlayers ? "Full" : "Join Game"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
