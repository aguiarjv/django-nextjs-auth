import { DashHeader } from "@/components/dash-header";
import { DashMain } from "@/components/dash-main";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: {
    title?: string;
    page?: string;
  };
}) {
  return (
    <div className="p-6 flex flex-col gap-2 max-w-[1000px] mx-auto">
      <DashHeader />
      <DashMain searchParams={searchParams} />
    </div>
  );
}
