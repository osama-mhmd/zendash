import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import api from "@/libs/api";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { ErrorFeild, required } from "./register";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  loader: () => api.authenticated(),
});

interface Inputs {
  email: string;
  password: string;
}

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const { authenticated } = Route.useLoaderData();

  if (authenticated) navigate({ to: "/dashboard" });

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const body = {
      email: inputs.email,
      password: inputs.password,
    };

    const result = await api("auth/login", { body });

    if (!result.ok) {
      const message =
        typeof result.message == "string"
          ? result.message
          : result.message.join(" ");
      toast.error(message ?? "Something went wrong");
      return;
    }

    navigate({ to: "/" });
  };

  return (
    <main>
      <section>
        <div className="cnt py-36">
          <form
            className="flex flex-col space-y-2 mx-auto max-w-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-center font-game text-3xl">Login</h2>
            <p className="text-muted-foreground text-center mt-1 mb-6">
              Start your stressless journey of debugging using Zendash.
            </p>
            <Input
              placeholder="Email..."
              {...register("email", { required })}
            />
            <ErrorFeild error={errors.email} />
            <Input
              placeholder="Password..."
              {...register("password", { required })}
            />
            <ErrorFeild error={errors.password} />
            <Link to="/register" className="link">
              Already have an account? Sign in
            </Link>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
