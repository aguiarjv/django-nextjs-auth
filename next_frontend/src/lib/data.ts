import type { PostResponse, PostResponseError } from "./definitions";

export async function fetchPosts(
  page: string,
  title: string,
  accessToken: string | undefined,
): Promise<PostResponse | PostResponseError> {
  try {
    let postsUrl = process.env.BACKEND_URL + "/post/" + `?page=${page}`;

    if (title) {
      postsUrl += `&title=${title}`;
    }

    const response = await fetch(postsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) throw responseData;

    return responseData;
  } catch (err) {
    console.error("Error fetching data ", err);
    return { error: "FetchPostsError" as const };
  }
}
