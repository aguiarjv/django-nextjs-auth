import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

export default async function Dashboard() {
  const authContent = await auth();
  console.log(authContent);

  return (
    <div className="w-screen h-screen flex items-center">
      <div className="w-3/12 border-2 rounded-lg flex flex-col items-center justify-center p-3 mx-auto">
        <div>
          <h1 className="font-medium text-lg">
            Welcome <strong>User</strong>
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
