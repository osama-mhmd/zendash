import api from "@/libs/api";
import React from "react";

import * as z from "zod";

import type { Event, Issue } from ".";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  AlertDiamondIcon,
  ChevronLeft,
  ChevronRight,
  Clock01Icon,
  Person,
  WaterfallUp02Icon,
} from "@hugeicons/core-free-icons";
import { cn, timeAgo } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

const validateSearch = z.object({
  id: z.string(),
});

export const Route = createFileRoute("/dashboard/issue")({
  component: RouteComponent,
  validateSearch,
});

function RouteComponent() {
  const { id } = Route.useSearch();
  const [currentEvent, setCurrentEvent] = React.useState(1);

  const { data, isPending, error } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      return {
        issue: (await api("issues/" + id, { method: "GET" })).data as Issue,
        events: (await api("events?issueId=" + id, { method: "GET" }))
          .data as Event[],
      };
    },
  });

  const issue = data?.issue as Issue;

  const nextEvent = React.useCallback(() => {
    if (!data) return;

    setCurrentEvent((val) => {
      if (val == data?.events.length) return val;
      return val + 1;
    });
  }, [data]);

  const prevEvent = React.useCallback(() => {
    if (!data) return;

    setCurrentEvent((val) => {
      if (val == 1) return val;
      return val - 1;
    });
  }, [data]);

  if (isPending) return "loading";
  if (error) return "Something went wrong";

  const ev = data?.events[currentEvent - 1];

  return (
    <main>
      <section className="py-16">
        <div className="cnt space-y-3">
          <Link
            to="/dashboard"
            className="flex gap-1 items-center p-2 pr-4 bg-muted w-fit rounded-2xl text-sm"
          >
            <HugeiconsIcon icon={ChevronLeft} size={18} /> Back to dashboard
          </Link>
          <div
            className="p-2 grid grid-cols-[1fr_auto] transition px-4 rounded-2xl border bg-muted/5"
            key={issue.id}
          >
            <div>
              <h3 className="text-xl flex text-red-300 gap-2 my-2 font-bold uppercase">
                {"error" == "error" ? (
                  <HugeiconsIcon icon={Alert02Icon} />
                ) : (
                  <HugeiconsIcon icon={AlertDiamondIcon} />
                )}{" "}
                {issue.fingerprintValue}
              </h3>
              <div className="text-sm space-x-1">
                {issue.status == "resolved" ? (
                  <span className="text-blue-400">Handled</span>
                ) : (
                  <span className="text-red-400">Unhandled</span>
                )}
              </div>
            </div>
            <div className="text-center items-center gap-4 flex *:gap-1 *:flex">
              <span className="underline text-muted-foreground">
                {timeAgo.format(issue.lastSeen)} ago
                <HugeiconsIcon icon={Clock01Icon} />
              </span>
              <span className="text-muted-foreground">
                - <HugeiconsIcon icon={WaterfallUp02Icon} />
              </span>
              <span className="text-muted-foreground">
                - <HugeiconsIcon icon={Person} />
              </span>
            </div>
          </div>
          <div className="flex text-sm items-center border rounded-2xl justify-between p-2 ps-4">
            <div className="text-muted-foreground ">
              Event <span className="text-foreground">{currentEvent}</span> out
              of <span className="text-foreground">{data?.events.length}</span>
            </div>
            <div className="flex gap-1">
              <HugeiconsIcon
                className={cn("bg-muted rounded-xl cursor-pointer p-1.5", {
                  "text-gray-600 cursor-not-allowed!": currentEvent == 1,
                })}
                onClick={prevEvent}
                icon={ChevronLeft}
                size={33}
              />
              <HugeiconsIcon
                className={cn("bg-muted rounded-xl cursor-pointer p-1.5", {
                  "text-gray-600 cursor-not-allowed!":
                    currentEvent == data?.events.length,
                })}
                onClick={nextEvent}
                icon={ChevronRight}
                size={33}
              />
            </div>
          </div>
          <div className="flex flex-col border rounded-2xl p-4 space-y-4">
            <div>
              <h3 className="text-xl text-muted-foreground">
                {ev.description}
              </h3>
              ID: #{ev.id}
            </div>
            <div>
              <h3 className="text-xl text-muted-foreground">Information</h3>
              <div>
                <div>{ev.stack}</div>
                <div>{ev.file}</div>
              </div>
            </div>
            <div>
              <h4 className="text-lg text-muted-foreground">Metadata</h4>
              <div>
                <div>Browser: {ev.browser}</div>
                <div>Platform: {ev.platform}</div>
                <div>Source: {ev.source}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
