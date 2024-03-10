"use server";

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const PostSchema = z.object({
  title: z
    .string()
    .max(50, { message: "Title must be 50 or fewer characters long" }),
  content: z
    .string()
    .max(255, { message: "Content must be 255 or fewer characters long" }),
});

export type PostState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  databaseError?: string | null;
  success: boolean;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function savePost(prevState: PostState, formData: FormData) {
  const session = await auth();

  const validatedData = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      databaseError: null,
      success: false,
    };
  }

  try {
    const savePostUrl = process.env.BACKEND_URL + "/post/";
    const response = await fetch(savePostUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: validatedData.data.title,
        content: validatedData.data.content,
      }),
    });
    const data = await response.json();

    if (!response.ok) throw data;
  } catch (err) {
    return { databaseError: "Something went wrong", success: false };
  }

  // Revalidate the cache for the dashboard page
  revalidatePath("/dashboard");

  return { success: true };
}
