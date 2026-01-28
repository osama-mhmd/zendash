import api from "@/libs/api";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  Career,
  CopyrightIcon,
  CustomerService01Icon,
  DashboardCircleIcon,
  Document,
  Health,
  Help,
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
            className="bg-gray-800/35 rounded-2xl text-xl p-4 px-4.5"
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
            <h1 className="text-6xl font-black text-blue-50 mb-3 max-w-3xl">
              Debug like in a{" "}
              <span className="font-game tracking-normal font-normal text-7xl">
                Game
              </span>{" "}
              with Zen mode enabled{" "}
              <HugeiconsIcon icon={Switch} size={80} className="inline" />
            </h1>
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
      <footer>
        <div className="cnt p-16 border rounded-3xl mb-10">
          <Link
            to="/login"
            className="text-3xl items-center mx-auto w-fit bg-muted/35 transition hover:bg-muted/65 p-4 px-6 rounded-3xl gap-2 font-game flex"
          >
            Join Zendash And Experience The Joy of Solving Bugs with Focus{" "}
            <HugeiconsIcon icon={ArrowRight02Icon} size={30} />
          </Link>
          <div className="flex justify-center gap-2 pt-4">
            <Link to="/" className="bg-muted/65 hover:bg-muted p-6 rounded-3xl">
              <HugeiconsIcon icon={Document} size={30} />
            </Link>
            <Link to="/" className="bg-muted/65 hover:bg-muted p-6 rounded-3xl">
              <HugeiconsIcon icon={Help} size={30} />
            </Link>
            <Link to="/" className="bg-muted/65 hover:bg-muted p-6 rounded-3xl">
              <HugeiconsIcon icon={CustomerService01Icon} size={30} />
            </Link>
            <Link to="/" className="bg-muted/65 hover:bg-muted p-6 rounded-3xl">
              <HugeiconsIcon icon={Career} size={30} />
            </Link>
            <Link
              to="/health"
              className="bg-muted/65 hover:bg-muted p-6 rounded-3xl"
            >
              <HugeiconsIcon icon={Health} size={30} />
            </Link>
          </div>
        </div>
        <div className="flex gap-1 justify-center mb-9">
          Copyrightes saved for Zendash <HugeiconsIcon icon={CopyrightIcon} />{" "}
          2026
        </div>
      </footer>
    </>
  );
}
