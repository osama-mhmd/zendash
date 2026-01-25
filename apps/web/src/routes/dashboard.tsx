import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import api from "@/libs/api";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import * as z from "zod";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UngroupLayersIcon,
  PlusSignCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { Panel, PanelAction, PanelBody } from "@/components/ui/panel";
import Command from "@/components/ui/command";
import { timeAgo } from "@/utils";

interface UserProject {
  userId: string;
  projectId: string;
  projectName: string;
}

interface ProjectEvent {
  projectId: string;
  userId: string;
  eventId: string | null;
  eventDescription: string | null;
  eventRecievedAt: string | null;
}

const validateSearch = z.object({
  projects: z.optional(z.string()),
});

const codeToConnect = `import { Zendash } from "zendash-reactjs-sdk";

// And in the app entrypoint
Zendash.init({ dns })`;

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  loader: () => api.authenticated(),
  validateSearch,
});

function RouteComponent() {
  const { projects } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { authenticated } = Route.useLoaderData();

  if (!authenticated) navigate({ to: "/login" });

  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = (await api("projects/me")).data;
      const events = (await api("events/me")).data;

      return { projects, events };
    },
  });

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
    navigate({ search: { projects: undefined } });
  };

  return (
    <main>
      <Panel
        onOpen={() => navigate({ search: { projects: "" } })}
        onClose={() => navigate({ search: { projects: undefined } })}
        defaultValue={typeof projects == "string"}
        overlayClose={false}
      >
        <PanelAction>
          <div className="absolute -top-12 left-1/2 group h-28 -translate-x-1/2">
            <div className="duration-400 bg-background group-hover:translate-y-14 transition p-2 border rounded-3xl">
              <HugeiconsIcon
                icon={UngroupLayersIcon}
                size={55}
                className="bg-muted p-3 rounded-2xl cursor-pointer"
              />
            </div>
          </div>
        </PanelAction>
        <PanelBody className="space-y-2 bg-[#0F0F0F]">
          <h3 className="text-2xl font-game mb-2">Projects</h3>
          {!isPending && data?.projects.length == 0 && (
            <div className="italic">No projects</div>
          )}
          {!isPending && data?.projects.length > 0 && (
            <div className="p-2 rounded border">
              {data.projects.map((pr: UserProject) => {
                const c = `${import.meta.env.VITE_BACKEND_URL}/events/create?projectId=${pr.projectId}`;

                return (
                  <div key={pr.projectId}>
                    <div>{pr.projectName}</div>
                    <div className="flex flex-col p-2 gap-2 border rounded my-2 bg-muted/75">
                      <b className="flex gap-1 items-center">
                        Connection string
                      </b>
                      <Command c={c} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Panel>
            <PanelAction>
              <Button>
                <HugeiconsIcon
                  className="mb-0.5"
                  size={18}
                  icon={PlusSignCircleIcon}
                />
                Create Project
              </Button>
            </PanelAction>
            <PanelBody layer={2}>
              <h3 className="text-xl font-game mb-2">Create project</h3>
              <form
                onSubmit={onSubmit}
                className="grid gap-2 grid-cols-[1fr_auto]"
              >
                <Input placeholder="Name..." name="name" type="text" required />
                <Button type="submit">Create</Button>
              </form>
            </PanelBody>
          </Panel>
        </PanelBody>
      </Panel>
      <section className="bg-[#0e0e0e] p-4">
        <div className="bg-background p-3 border rounded-3xl min-h-screen flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap gap-2">
              {isPending && (
                <div className="flex mx-auto translate-y-12 items-center gap-2 bg-muted p-2 rounded">
                  <HugeiconsIcon
                    className="animate-spin [animation-duration:2s]"
                    icon={Loading03Icon}
                  />
                  Fetching events
                </div>
              )}
              {!isPending && data.projects.length == 0 && (
                <div className="bg-muted w-full p-6 italic rounded-2xl">
                  You don't have any active projects{" "}
                  <p className="text-muted-foreground">
                    *try using the top bar to open projects
                  </p>
                </div>
              )}
              {!isPending &&
                data.projects.length > 0 &&
                data.events.length == 0 && (
                  <div className="bg-muted/50 w-full p-6 italic rounded-2xl">
                    <b>Congrats!</b> All you have to do now is just to connect
                    your project with the api.
                    <div className="not-italic max-w-lg space-y-2 p-2 border rounded my-4">
                      <div className="font-bold">
                        How to connect your project
                      </div>
                      <div>
                        Just install the following package (we currently support
                        reactjs)
                        <Command c="pnpm i -D zendash-reactjs-sdk" />
                      </div>
                      <div>
                        Connect your project
                        <Command mutliline c={codeToConnect} />
                      </div>
                    </div>
                  </div>
                )}
              <div className="flex flex-col w-full">
                {!isPending &&
                  data.events.map((ev: ProjectEvent) => (
                    <div
                      className="p-2 px-4 rounded-2xl border border-red-900 bg-red-900/25"
                      key={ev.eventId}
                    >
                      <h3 className="text-xl font-semibold text-red-600">
                        Error <code>#{ev.eventId}</code>
                      </h3>
                      <div>
                        <code>@desc</code> {ev.eventDescription}
                      </div>
                      <div>Recieved {timeAgo.format(ev.eventRecievedAt!)}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
