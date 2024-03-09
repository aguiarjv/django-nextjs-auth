import { auth } from "@/auth";
import { DashTable } from "@/components/dash-table";
import { DashHeader } from "@/components/dash-header";
import { DashPagination } from "@/components/dash-pagination";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="p-6 flex flex-col gap-2 max-w-[1000px] mx-auto">
      <DashHeader />
      <DashTable />
      <DashPagination />
    </div>
  );
}
