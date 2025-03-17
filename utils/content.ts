/// <reference lib="deno.unstable" />

import { log } from "./logger.ts";

// Initialize Deno KV connection
export const kv = await Deno.openKv();

const GAME_PREFIX = ["games"];

export interface Game {
  id: string;
  time: string;
  court: string;
  players: string[];
  maxPlayers: number;
}

// Game CRUD operations
export async function listGames(): Promise<Game[]> {
  const entries = await kv.list<Omit<Game, "id">>({ prefix: GAME_PREFIX });
  const games: Game[] = [];
  
  for await (const entry of entries) {
    const id = entry.key[1] as string;
    games.push({
      id,
      ...entry.value,
    });
  }
  
  // Sort games by time (ascending)
  return games.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
}

export async function getGame(id: string): Promise<Game | null> {
  const result = await kv.get<Omit<Game, "id">>([...GAME_PREFIX, id]);
  
  if (!result.value) {
    return null;
  }
  
  return {
    id,
    ...result.value,
  };
}

export async function createGame(game: Omit<Game, "id">): Promise<string> {
  const id = crypto.randomUUID();
  
  try {
    const result = await kv.set([...GAME_PREFIX, id], game);
    
    if (!result.ok) {
      throw new Error("Failed to create game");
    }
    
    await log({
      action: "create",
      entityType: "game",
      entityId: id,
      success: true,
      details: game,
    });
    
    return id;
  } catch (error) {
    await log({
      action: "create",
      entityType: "game",
      entityId: id,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: game,
    });
    
    throw error;
  }
}

export async function updateGame(id: string, game: Omit<Game, "id">): Promise<boolean> {
  try {
    const result = await kv.set([...GAME_PREFIX, id], game);
    
    await log({
      action: "update",
      entityType: "game",
      entityId: id,
      success: result.ok,
      details: game,
    });
    
    return result.ok;
  } catch (error) {
    await log({
      action: "update",
      entityType: "game",
      entityId: id,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: game,
    });
    
    throw error;
  }
}

export async function deleteGame(id: string): Promise<void> {
  try {
    await kv.delete([...GAME_PREFIX, id]);
    
    await log({
      action: "delete",
      entityType: "game",
      entityId: id,
      success: true,
    });
  } catch (error) {
    await log({
      action: "delete",
      entityType: "game",
      entityId: id,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    
    throw error;
  }
}

export async function joinGame(gameId: string, playerName: string): Promise<boolean> {
  const game = await getGame(gameId);
  
  if (!game) {
    throw new Error("Game not found");
  }
  
  if (game.players.length >= game.maxPlayers) {
    throw new Error("Game is full");
  }
  
  if (game.players.includes(playerName)) {
    throw new Error("Player already joined");
  }
  
  const updatedGame = {
    ...game,
    players: [...game.players, playerName],
  };
  
  return updateGame(gameId, {
    time: updatedGame.time,
    court: updatedGame.court,
    players: updatedGame.players,
    maxPlayers: updatedGame.maxPlayers,
  });
}

export async function leaveGame(gameId: string, playerName: string): Promise<boolean> {
  const game = await getGame(gameId);
  
  if (!game) {
    throw new Error("Game not found");
  }
  
  if (!game.players.includes(playerName)) {
    throw new Error("Player not in game");
  }
  
  const updatedGame = {
    ...game,
    players: game.players.filter(p => p !== playerName),
  };
  
  return updateGame(gameId, {
    time: updatedGame.time,
    court: updatedGame.court,
    players: updatedGame.players,
    maxPlayers: updatedGame.maxPlayers,
  });
}
