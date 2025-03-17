// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_games from "./routes/api/games.ts";
import * as $games_create from "./routes/games/create.tsx";
import * as $games_join from "./routes/games/join.tsx";
import * as $games_leave from "./routes/games/leave.tsx";
import * as $index from "./routes/index.tsx";

import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/games.ts": $api_games,
    "./routes/games/create.tsx": $games_create,
    "./routes/games/join.tsx": $games_join,
    "./routes/games/leave.tsx": $games_leave,
    "./routes/index.tsx": $index,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
