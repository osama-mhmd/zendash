import api from "@/libs/api";
import { cn } from "@/utils";
import {
  Database02Icon,
  RamMemoryIcon,
  Storage,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/health")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, error } = useQuery({
    queryKey: ["health"],
    queryFn: () =>
      api("health", {
        method: "GET",
      }) as Promise<HealthResponse>,
  });

  if (error) {
    console.log(error);
    return "Something went wrong";
  }

  if (isPending) return "Waiting...";

  console.log(data);

  return (
    <main>
      <section>
        <div className="cnt py-16">
          <h3 className="text-2xl font-bold mb-2">Health</h3>
          <p
            className={cn("text-lg", {
              "text-blue-400": data.status == "ok",
              "text-red-400": data.status !== "ok",
            })}
          >
            Zendash is {data.status !== "ok" && "not "} working correctly.
          </p>
          <HealthCards details={data.details} />
        </div>
      </section>
    </main>
  );
}

function HealthCards({ details }: { details: HealthResponse["details"] }) {
  const icons = {
    database: Database02Icon,
    storage: Storage,
    memory: RamMemoryIcon,
  } as const;

  return (
    <ul className="flex flex-wrap gap-1 mt-2">
      {Object.keys(details).map((key) => {
        const status = details[key as keyof typeof details].status;

        return (
          <li
            key={key}
            className={cn("", {
              "text-red-400": status == "down",
              "text-blue-400": status == "up",
            })}
          >
            <div className="border rounded-t flex items-center justify-center min-h-50 min-w-sm border-b-transparent">
              <HugeiconsIcon
                icon={icons[key as keyof typeof icons]}
                size={100}
              />
            </div>
            <div className="p-6 bg-muted rounded-b">
              <h4 className="text-lg capitalize">{key}</h4>
              The {key} service is {status == "down" && "not"} fine.
            </div>
          </li>
        );
      })}
    </ul>
  );
}
