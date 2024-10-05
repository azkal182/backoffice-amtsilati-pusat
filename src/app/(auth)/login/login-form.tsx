"use client";
import { signInSchema } from "@/schemas/login";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "@/actios/login";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const { pending } = useFormStatus();
  const [isLoading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsloading(true);
    await login(values).then((data) => {
      setError("");
      if (data?.error) {
        setError(data.error);
        setIsloading(false);
      }
    });
  };

  return (
    <>
      {error && (
        <div className="flex items-center justify-center rounded bg-red-500/25 p-1 text-red-500 dark:bg-danger-dark-light">
          <span className="ltr:pr-2 rtl:pl-2">
            <strong className="ltr:mr-1 rtl:ml-1">{error}!</strong>
          </span>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-6 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div className="relative">
          <Label htmlFor="username" className="dark:text-gray-200">
            Username
          </Label>
          <Input
            {...register("username")}
            autoComplete="off"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            className="dark:text-gray-200"
          />
          {errors.username && (
            <div className="mt-1 text-red-500 text-xs">
              {errors.username.message}
            </div>
          )}
        </div>
        <div className="relative">
          <Label htmlFor="password" className="dark:text-gray-200">
            Password
          </Label>
          <Input
            {...register("password")}
            autoComplete="off"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="dark:text-gray-200"
          />
          {errors.password && (
            <div className="mt-1 text-red-500 text-xs">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="relative mt-4">
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full"
            // className="bg-cyan-500 text-white rounded-md px-2 py-1 w-full"
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
