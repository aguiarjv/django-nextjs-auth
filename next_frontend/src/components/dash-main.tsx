import { DashPagination } from "./dash-pagination";
import { DashTable } from "./dash-table";
import { auth } from "@/auth";

export type PostData = {
  id: number;
  user: string;
  title: string;
  content: string;
  created_at: string;
};

export async function DashMain({
  searchParams,
}: {
  searchParams?: {
    title?: string;
    page?: string;
  };
}) {
  const session = await auth();
  let postData: PostData[] | null = null;
  let count: number = 0;
  let pages: number = 1;

  const currentPage = searchParams?.page || "1";
  const titleFilter = searchParams?.title || "";

  try {
    let postsUrl = process.env.BACKEND_URL + "/post/" + `?page=${currentPage}`;

    if (titleFilter) {
      postsUrl += `&title=${titleFilter}`;
    }

    const response = await fetch(postsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) throw responseData;

    postData = responseData.results;
    count = responseData.count;
    pages = Math.ceil(count / responseData.default_page_size);

    postData?.forEach((item) => {
      item.created_at = item.created_at.split("T")[0];
      if (item.content.length > 35) {
        item.content = item.content.slice(0, 36) + "...";
      }
    });
  } catch (err) {
    console.error("Error fetching data ", err);
  }

  return (
    <div className="space-y-3">
      {!!postData ? <DashTable data={postData} /> : <p>Error fetching data</p>}
      <DashPagination items={count} totalPages={pages} />
    </div>
  );
}
