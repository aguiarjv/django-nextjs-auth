"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { PostState, RegisterState } from "./definitions";
import { fetchPostById } from "./data";
import { redirect } from "next/navigation";

const PostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "This field is required." })
    .max(50, { message: "Title must be 50 or fewer characters long" }),
  content: z
    .string()
    .trim()
    .min(1, { message: "This field is required." })
    .max(255, { message: "Content must be 255 or fewer characters long" }),
});

const RegisterSchema = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  password2: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

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

export async function register(prevState: RegisterState, formData: FormData) {
  const validatedData = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    password2: formData.get("password2"),
  });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
      success: false,
    };
  }

  if (validatedData.data.password != validatedData.data.password2) {
    return {
      errors: { password2: ["Passwords must match"] },
      success: false,
    };
  }

  try {
    const registerUrl = process.env.BACKEND_URL + "/register/";
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validatedData.data.email,
        password: validatedData.data.password,
        password2: validatedData.data.password2,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw data;
  } catch (err) {
    console.log("Error registering new user ", err);
    return { errors: {}, success: false };
  }

  redirect("/login");
}

export async function savePost(prevState: PostState, formData: FormData) {
  const session = await auth();

  let method = "POST";
  let savePostUrl = process.env.BACKEND_URL + "/post/";

  if (formData.get("update")?.toString() == "true") {
    method = "PUT";
    savePostUrl += `${formData.get("postid")?.toString()}/`;
  }

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
    const response = await fetch(savePostUrl, {
      method: method,
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

export async function deletePost(formData: FormData) {
  const session = await auth();
  const postId = formData.get("postid")?.toString();
  const deleteUrl = process.env.BACKEND_URL + `/post/${postId}/`;

  try {
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!response.ok) throw Error("Error");
  } catch (err) {
    console.log("Error deleting post ", err);
  }
  // Revalidate the cache for the dashboard page
  revalidatePath("/dashboard");
}

export async function getPostById(id: number) {
  const session = await auth();
  const data = await fetchPostById(id, session?.accessToken);

  return data;
}
