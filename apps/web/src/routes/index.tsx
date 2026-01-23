import Button from "@/components/ui/button";
import api from "@/libs/api";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => api.authenticated(),
});

function App() {
  const { authenticated, user } = Route.useLoaderData();

  console.log(authenticated);

  return (
    <main>
      <section>
        <div className="cnt text-center flex flex-col items-center gap-y-2 mt-36">
          <h1 className="text-6xl font-game">Zendash</h1>
          <p className="text-mutued-foreground">
            Debug like in a Game with Zen mode
          </p>
          {user ? (
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
  );
}
