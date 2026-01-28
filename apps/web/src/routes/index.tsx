import api from "@/libs/api";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardCircleIcon,
  Login01Icon,
  Switch,
} from "@hugeicons/core-free-icons";
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
          <Link
            to={authenticated ? "/dashboard" : "/login"}
            className="bg-gray-800/35 rounded-2xl text-xl p-4"
          >
            <HugeiconsIcon
              icon={authenticated ? DashboardCircleIcon : Login01Icon}
            />
          </Link>
        </div>
      </nav>
      <main>
        <section>
          <div className="cnt text-center flex flex-col items-center gap-y-2 my-25">
            <h1 className="text-6xl font-black text-blue-50 text-shadow-md text-shadow-blue-900 mb-3 max-w-3xl">
              Debug like in a{" "}
              <span className="font-game tracking-normal font-normal text-7xl">
                Game
              </span>{" "}
              with Zen mode enabled{" "}
              <HugeiconsIcon icon={Switch} size={80} className="inline" />
            </h1>
            {/* <p className="text-muted-foreground mb-2"></p> */}
            {/* {authenticated ? (
              <Button asChild>
                <Link to="/dashboard">Continue debugging</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/register">Create an account</Link>
              </Button>
            )} */}
            <div className="border scale-75 -my-20 rounded-3xl">
              <div className="h-10 bg-muted/25 rounded-t-3xl flex items-center gap-1 ps-5 px-3 justify-between">
                <div className="text-sm text-muted-foreground">
                  Image: Issue page
                </div>
                <div className="flex gap-1">
                  <div className="size-4 rounded-full bg-red-400"></div>
                  <div className="size-4 rounded-full bg-yellow-400"></div>
                  <div className="size-4 rounded-full bg-green-400"></div>
                </div>
              </div>
              <img className="rounded-b-3xl" src="/showcases/issue-page.png" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
