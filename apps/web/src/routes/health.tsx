import api from "@/libs/api";
import { cn } from "@/utils";
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
          <ul className="flex flex-col gap-1 mt-2">
            {Object.keys(data.info).map((key) => {
              const status = data.info[key as keyof typeof data.info].status;
              return (
                <li
                  key={key}
                  className={cn("p-2 rounded bg-muted", {
                    "text-red-400": status == "down",
                    "text-blue-400": status == "up",
                  })}
                >
                  {key} is {status == "down" && "not"} fine.
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
