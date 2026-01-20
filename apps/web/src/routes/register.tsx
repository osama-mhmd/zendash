import Input from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <section>
        <div className="cnt py-36">
          <form className="flex flex-col items-center" action="">
            <h2 className="text-center font-semibold text-3xl">
              Create an account
            </h2>
            <Input placeholder="Fullname..." />
          </form>
        </div>
      </section>
    </main>
  );
}
