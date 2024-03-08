"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";

export default function Login() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="w-screen h-screen flex items-center ">
      <form
        action={dispatch}
        className="w-1/4 mx-auto flex flex-col gap-6 items-center justify-center border-2 rounded-lg p-3 "
      >
        <h1 className="font-bold text-lg ">Login</h1>
        <Input type="text" name="email" placeholder="username" />
        <Input type="password" name="password" placeholder="password" />
        <LoginButton />
        <div>
          {errorMessage && (
            <p className="text-red-500 font-medium">{errorMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" aria-disabled={pending}>
      Log In
    </Button>
  );
}
