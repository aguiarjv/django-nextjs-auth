import { Button } from "@/components/ui/button";
import { signOut, auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="w-screen h-screen flex items-center">
      <div className="w-3/12 border-2 rounded-lg flex flex-col items-center justify-center p-3 mx-auto">
        <div>
          <h1 className="font-medium text-lg">
            Welcome
            {session?.user?.email && <strong> {session.user.email}</strong>}
          </h1>
          <h1 className="font-medium text-lg">Id: 0</h1>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="destructive">Sign Out</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
