"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function Login() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="w-screen h-screen flex items-center ">
      <form
        action={dispatch}
        className="mx-auto flex flex-col gap-6 items-center justify-center border-2 rounded-lg p-3 w-[450px] "
      >
        <h1 className="font-bold text-lg ">Login</h1>
        <Input type="text" name="email" placeholder="username or email" />
        <Input type="password" name="password" placeholder="password" />
        <LoginButton />
        <div>
          {errorMessage && (
            <p className="text-red-500 font-medium -mt-4">{errorMessage}</p>
          )}
        </div>
        <Link href="/dasbhoard" className="self-start -mt-8 -ml-2">
          <Button variant="link">New user? Sign in</Button>
        </Link>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full space-x-2" aria-disabled={pending}>
      <span>Login</span>
      <LogIn className="size-5" />
    </Button>
  );
}
