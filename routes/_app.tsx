
import { type PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

}

export default function App({ Component, data, state }: PageProps) {
  const isAuthenticated = (state?.isAuthenticated || false) as boolean;
  const user = state.session.get("user");

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PickleZone - Find Pickleball Games</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="min-h-screen bg-gray-50">
          <Header isAuthenticated={isAuthenticated} userName={user?.name} />
          <main>
            <Component />
          </main>
        </div>
      </body>
    </html>
  );
}
