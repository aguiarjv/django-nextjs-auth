import { auth } from "@/auth";
import { fetchPosts } from "@/lib/data";
import { DashHeader } from "@/components/dash-header";
import { DashPagination } from "@/components/dash-pagination";
import { DashTable } from "@/components/dash-table";
import type { PostData } from "@/lib/definitions";
import { Suspense } from "react";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: {
    title?: string;
    page?: string;
  };
}) {
  return (
    <div className="p-6 flex flex-col gap-2 max-w-[1000px] mx-auto pb-0">
      <DashHeader />
      <Suspense
        key={String(searchParams?.title) + String(searchParams?.page)}
        fallback={<p>loading...</p>}
      >
        <DashMain searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function DashMain({
  searchParams,
}: {
  searchParams?: {
    title?: string;
    page?: string;
  };
}) {
  let postData: PostData[] | null = null;
  let count: number = 0;
  let pages: number = 1;

  const currentPage = searchParams?.page || "1";
  const titleFilter = searchParams?.title || "";

  const session = await auth();

  const responseData = await fetchPosts(
    currentPage,
    titleFilter,
    session?.accessToken,
  );

  if (!("error" in responseData)) {
    postData = responseData.results;
    count = responseData.count;
    pages = Math.ceil(count / responseData.default_page_size);

    postData?.forEach((item) => {
      item.created_at = item.created_at.split("T")[0];
      if (item.content.length > 35) {
        item.content = item.content.slice(0, 36) + "...";
      }

      if (item.title.length > 35) {
        item.title = item.title.slice(0, 36) + "...";
      }
    });
  }

  return (
    <div className="space-y-3">
      {!!postData ? <DashTable data={postData} /> : <p>Error fetching data</p>}
      <DashPagination items={count} totalPages={pages} />
    </div>
  );
}
