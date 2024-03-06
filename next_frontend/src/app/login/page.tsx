import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <div className="w-screen h-screen flex items-center ">
      <form
        action=""
        className="w-1/4 mx-auto flex flex-col gap-6 items-center justify-center border-2 rounded-lg p-3 "
      >
        <h1 className="font-bold text-lg ">Login</h1>
        <Input type="email" placeholder="your_email@example.com" />
        <Input type="password" placeholder="password" />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
