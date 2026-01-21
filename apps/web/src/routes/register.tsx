import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import api from "@/libs/api";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

interface Inputs {
  fullname: string;
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    const [res, err] = await api("auth/register", { body });

    if (err) {
      toast.error("Something went wrong when trying to create an account");
    }

    // res either returns {ok:true} | {ok:false,message}

    if (res.ok) redirect({ to: "/" });
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
              {...register("fullname", { required: true })}
            />
            {errors.fullname && <p>This field is required</p>}
            <Input
              placeholder="Username..."
              {...register("username", { required: true })}
            />
            {errors.username && <p>This field is required</p>}
            <Input
              placeholder="Email..."
              {...register("email", { required: true })}
            />
            {errors.email && <p>This field is required</p>}
            <Input
              placeholder="Password..."
              {...register("password", { required: true })}
            />
            {errors.password && <p>This field is required</p>}
            <Input
              placeholder="Repeat password..."
              {...register("passwordRepeat", { required: true })}
            />
            {errors.passwordRepeat && <p>This field is required</p>}
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
