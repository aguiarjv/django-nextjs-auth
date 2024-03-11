"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/lib/actions";
import Link from "next/link";
import { UserRoundPlus } from "lucide-react";
import type { RegisterState } from "@/lib/definitions";

export default function SignUp() {
  const initialState: RegisterState = { errors: {}, success: false };
  const [state, dispatch] = useFormState(register, initialState);

  return (
    <div className="w-screen h-screen flex items-center ">
      <form
        action={dispatch}
        className="mx-auto flex flex-col gap-6 items-center justify-center border-2 rounded-lg p-3 w-[450px] "
      >
        <h1 className="font-bold text-lg ">Create New Account</h1>
        <Input type="email" name="email" placeholder="email" />
        {state.errors?.email &&
          state.errors.email.map((item: string) => (
            <p className="text-red-500 font-medium" key={item}>
              {item}
            </p>
          ))}
        <Input type="password" name="password" placeholder="password" />
        {state.errors?.password &&
          state.errors.password.map((item: string) => (
            <p className="text-red-500 font-medium" key={item}>
              {item}
            </p>
          ))}
        <Input
          type="password"
          name="password2"
          placeholder="repeat your password"
        />
        {state.errors?.password2 &&
          state.errors.password2.map((item: string) => (
            <p className="text-red-500 font-medium" key={item}>
              {item}
            </p>
          ))}
        <SignUpButton />
        <div></div>
        <Link href="/login" className="self-start -mt-8 -ml-2">
          <Button variant="link">Already have an account? Sign in</Button>
        </Link>
      </form>
    </div>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full flex flex-row items-center justify-center gap-2"
      type="submit"
      disabled={pending}
    >
      <span>Create Account</span>
      <UserRoundPlus className="size-4" />
    </Button>
  );
}
