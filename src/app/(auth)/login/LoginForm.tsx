"use client";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginObjectType } from "./login.types";
import { loginSchema } from "./login.Schemas";
import { getCurrentLoggedInUserCart, LoginAction } from "./login.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { cartContextType, useCart } from "@/app/_context/cartContext";
export default function LoginForm() {
  const { handleSubmit, control } = useForm<LoginObjectType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { updateNumberOfCartItems } = useCart() as cartContextType;
  async function mySubmit(data: LoginObjectType) {
    const res = await signIn("credentials", { redirect: false, ...data });
    if (res?.ok) {
      toast.success("Welcome Fresh Carter", {
        duration: 3000,
        position: "top-right",
        richColors: true,
      });
      const res = await getCurrentLoggedInUserCart();

      updateNumberOfCartItems(res?.products.length || 0);
      router.push("/");
      // setTimeout(() => {

      // }, 3000);
    } else {
      toast.error("Email or password is incorrect", {
        duration: 3000,
        position: "top-right",
        richColors: true,
      });
    }
    // console.log("Logged in", data);

    // const isLoggedInSuccessfuly = await LoginAction(data);
    // if (isLoggedInSuccessfuly) {
    //   toast.success("Welcome Fresh Carter", {
    //     duration: 3000,
    //     position: "top-right",
    //   });
    //   setTimeout(() => {
    //     router.push("/");
    //   }, 3000);
    // } else {
    //   toast.error("Email or password is incorrect", {
    //     duration: 3000,
    //     position: "top-right",
    //   });
    // }
  }
  return (
    <form
      onSubmit={handleSubmit(mySubmit)}
      className="flex flex-col gap-4 pt-2 pb-2"
    >
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...field}
              id="email"
              aria-invalid={fieldState.invalid}
              placeholder="User Email..."
              autoComplete="off"
              type="email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              {...field}
              id="password"
              aria-invalid={fieldState.invalid}
              placeholder="User Password..."
              autoComplete="off"
              type="password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button className="bg-emerald-600 w-full my-2 text-xl cursor-pointer">
        Login
      </Button>
    </form>
  );
}
