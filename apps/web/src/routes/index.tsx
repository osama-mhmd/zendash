import Button from "@/components/ui/button";
import api from "@/libs/api";

import { HugeiconsIcon } from "@hugeicons/react";
import { Login01Icon } from "@hugeicons/core-free-icons";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => api.authenticated(),
});

function App() {
  const { authenticated } = Route.useLoaderData();

  return (
    <>
      <nav className="border bg-muted/50 flex justify-between mx-auto max-w-xl w-full p-2 rounded-3xl mt-6">
        <Link to="/" className="bg-gray-800 rounded-2xl text-xl p-4">
          ZD
        </Link>
        <div className="flex">
          <Link to="/login" className="bg-gray-800/35 rounded-2xl text-xl p-4">
            <HugeiconsIcon icon={Login01Icon} />
          </Link>
        </div>
      </nav>
      <main>
        <section>
          <div className="cnt text-center flex flex-col items-center gap-y-2 mt-36">
            <h1 className="text-6xl font-game">Zendash</h1>
            <p className="text-mutued-foreground">
              Debug like in a Game with Zen mode
            </p>
            {authenticated ? (
              <Button asChild>
                <Link to="/dashboard">Continue debugging</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/register">Create an account</Link>
              </Button>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
