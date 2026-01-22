import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import * as z from "zod";
import { useEffect } from "react";

interface UserProject {
  userId: string;
  projectId: string;
  projectName: string;
  projectKey: string;
}

interface ProjectEvent {
  projectId: string;
  userId: string;
  eventId: string | null;
  eventDescription: string | null;
  eventRecievedAt: Date | null;
}

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

  useEffect(() => {
    (async () => {
      const result = await api("auth/me");

      if (!result.ok) {
        toast.error("Sorry, but you have no access. " + result.message);
        return;
      }

      toast.success(
        "Hello " + result.user.fullname + ", hope you enjoy Zendash.",
      );
    })();
  }, []);

  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = (await api("projects/me")).data;
      const events = (await api("events/me")).data;

      return { projects, events };
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

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

  const openCreateProjectDialog = () => {
    navigate({ search: { createProject: "" } });
  };

  return (
    <main>
      <section>
        <div className="cnt flex flex-col gap-6 py-16">
          <div>
            <h2 className="text-3xl font-game mb-4">Projects</h2>
            <div className="flex flex-wrap gap-2">
              {data.projects.map((pr: UserProject) => (
                <div className="p-2 px-4 rounded-md border" key={pr.projectId}>
                  {pr.projectName}: {pr.projectKey}
                </div>
              ))}
              <Button onClick={openCreateProjectDialog}>Create project</Button>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-game mb-4">Events</h2>
            <div className="flex flex-wrap gap-2">
              {data.events.map((ev: ProjectEvent) => (
                <div className="p-2 px-4 rounded-md border" key={ev.eventId}>
                  {ev.eventDescription}: {ev.eventId}
                </div>
              ))}
            </div>
          </div>
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
