"use client";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterObjectType } from "./register.types";
import { registerSchema } from "./register.Schemas";
import { RegisterAction } from "./register.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function RegisterForm() {
  const { handleSubmit, control } = useForm<RegisterObjectType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  const router = useRouter();
  async function mySubmit(data: RegisterObjectType) {
    console.log("registered", data);

    const isRegisteredSuccessfuly = await RegisterAction(data);
    if (isRegisteredSuccessfuly) {
      toast.success("Email Created Successfully", {
        duration: 3000,
        position: "top-right",
        richColors: true,
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      toast.error("Email already Exist", {
        duration: 3000,
        position: "top-right",
        richColors: true,
      });
    }
  }
  return (
    <form
      onSubmit={handleSubmit(mySubmit)}
      className="flex flex-col gap-4 pt-2 pb-2"
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              {...field}
              id="username"
              aria-invalid={fieldState.invalid}
              placeholder="Username..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              {...field}
              id="phone"
              aria-invalid={fieldState.invalid}
              placeholder="User Phone..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

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
      <Controller
        name="rePassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="repass">Password Confirmation</FieldLabel>
            <Input
              {...field}
              id="repass"
              aria-invalid={fieldState.invalid}
              placeholder="Password Confirmation..."
              autoComplete="off"
              type="password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button className="bg-emerald-600 w-full my-2 text-xl cursor-pointer">
        register
      </Button>
    </form>
  );
}
