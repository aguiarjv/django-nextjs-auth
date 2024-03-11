export type PostData = {
  id: number;
  user: string;
  title: string;
  content: string;
  created_at: string;
};

export type PostResponse = {
  count: number;
  default_page_size: number;
  next: string | null;
  previous: string | null;
  results: PostData[];
};

export type PostResponseError = {
  error: "FetchPostsError";
};

export type PostState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  databaseError?: string | null;
  success: boolean;
};

export type RegisterState = {
  errors?: {
    email?: string[];
    password?: string[];
    password2?: string[];
  };
  success?: boolean;
};
