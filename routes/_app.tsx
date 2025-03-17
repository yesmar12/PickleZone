
import { type PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

interface State {
  isAuthenticated: boolean;
  userEmail?: string;
}

interface AppProps extends PageProps {
  state: {
    isAuthenticated?: boolean;
    userEmail?: string;
  };
}

export default function App({ Component, data, state }: AppProps) {
  const isAuthenticated = state?.isAuthenticated || false;
  const userEmail = state?.userEmail;

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
          <Header isAuthenticated={isAuthenticated} userEmail={userEmail} />
          <main>
            <Component />
          </main>
        </div>
      </body>
    </html>
  );
}
