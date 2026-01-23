import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import api from "@/libs/api";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, type FieldError, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
  loader: () => api.authenticated(),
});

interface Inputs {
  fullname: string;
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

/**
 * @description A required attr with custom message [used for react-hook-form]
 */
export const required = {
  value: true,
  message: "This field is required",
};

export const ErrorFeild = ({ error }: { error: FieldError | undefined }) => {
  return error && <p className="p-2 bg-red-900">{error.message}</p>;
};

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
      fullname: inputs.fullname,
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    };

    const result = await api("auth/register", { body });

    if (!result.ok) {
      const message =
        typeof result.message == "string"
          ? result.message
          : result.message.join(" ");
      toast.error(message ?? "Something went wrong");
      return;
    }

    navigate({ to: "/login" });
  };

  return (
    <main>
      <section>
        <div className="cnt py-36">
          <form
            className="flex flex-col space-y-2 mx-auto max-w-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-center font-game text-3xl">
              Create an account
            </h2>
            <p className="text-muted-foreground text-center mt-1 mb-6">
              Start your stressless journey of debugging using Zendash.
            </p>
            <Input
              placeholder="Fullname..."
              {...register("fullname", { required })}
            />
            <ErrorFeild error={errors.fullname} />
            <Input
              placeholder="Username..."
              {...register("username", { required })}
            />
            <ErrorFeild error={errors.username} />
            <Input
              placeholder="Email..."
              type="email"
              {...register("email", { required })}
            />
            <ErrorFeild error={errors.email} />
            <Input
              placeholder="Password..."
              type="password"
              {...register("password", { required })}
            />
            <ErrorFeild error={errors.password} />
            <Input
              placeholder="Repeat password..."
              type="password"
              {...register("passwordRepeat", { required })}
            />
            <ErrorFeild error={errors.passwordRepeat} />
            <Link to="/login" className="link">
              Already have an account? Log in
            </Link>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
