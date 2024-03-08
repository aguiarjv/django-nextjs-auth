import { DashSideBar } from "@/components/dash-side";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen max-w-[1500px] min-w-[1150px] grid grid-cols-6 mx-auto p-6">
      <nav className="col-span-1 border-r overflow-hidden ">
        <DashSideBar />
      </nav>
      <main className="col-span-5 border-r">{children}</main>
    </div>
  );
}
