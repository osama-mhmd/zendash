import Button from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main>
      <section>
        <div className="cnt text-center flex flex-col items-center gap-y-2 mt-36">
          <h1 className="text-6xl">Zendash</h1>
          <p className="text-mutued-foreground">
            Debug like in a Game with Zen mode
          </p>
          <Button asChild>
            <Link to="/register">Create an account</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
