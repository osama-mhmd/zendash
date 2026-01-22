import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import * as z from "zod";

const validateSearch = z.object({
  createProject: z.string().or(z.undefined()),
});

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  validateSearch,
});

function RouteComponent() {
  const { createProject } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const {} = useQuery({
    initialData: null,
    queryKey: ["events"],
    queryFn: () => api("projects"),
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    const data = new FormData(ev.currentTarget);
    const name = data.get("name");

    if (!name) return;

    const result = await api("projects/create", { body: { name } });

    if (!result.ok) {
      toast.error("Something went wrong: ", result.message);
    }

    toast.success("Project created successfully.");
    navigate({ search: { createProject: undefined } });
  };

  return (
    <main>
      <section>
        <div className="cnt flex flex-col gap-12 py-16">
          <div>
            <h2 className="text-3xl font-game">Projects</h2>
          </div>
          <h2 className="text-3xl font-game">Events</h2>
        </div>
      </section>
      {typeof createProject == "string" && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/35 z-10 flex items-center justify-center">
          <div className="bg-mutued min-w-lg p-4 rounded-md">
            <h3 className="text-xl font-game mb-2">Create project</h3>
            <form
              onSubmit={onSubmit}
              className="grid gap-2 grid-cols-[1fr_auto]"
            >
              <Input placeholder="Name..." name="name" type="text" required />
              <Button type="submit">Create</Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
