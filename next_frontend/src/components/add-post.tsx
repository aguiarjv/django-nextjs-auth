"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { savePost } from "@/lib/actions";
import { useEffect, useState } from "react";
import type { PostState } from "@/lib/definitions";

export function AddNewPost() {
  const initialState = { success: false, databaseError: null, errors: {} };
  const [state, setState] = useState<PostState>(initialState);
  const [postState, dispatch] = useFormState(savePost, initialState);

  useEffect(() => {
    if (postState) {
      setState(postState);
    }
  }, [postState]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="space-x-2"
          onClick={() => setState(initialState)}
        >
          <CirclePlus className="size-5" />
          <span>Add new post</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription>
            Enter the title and the content of your new post to save it in your
            account.
          </DialogDescription>
        </DialogHeader>
        <form action={dispatch}>
          <div className="space-y-3">
            <div>
              <Label htmlFor="post-title">Title</Label>
              <Input
                id="post-title"
                name="title"
                maxLength={50}
                onChange={() => setState(initialState)}
                required
              />
              {state.errors?.title &&
                state.errors?.title.map((error: string) => (
                  <p className="text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            <div>
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                name="content"
                rows={7}
                maxLength={255}
                onChange={() => setState(initialState)}
                required
                spellCheck={false}
              />
              {state.errors?.content &&
                state.errors?.content.map((error: string) => (
                  <p className="text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
            {state.databaseError && (
              <p className="text-red-500">{state.databaseError}</p>
            )}
            {state.success && (
              <p className="text-green-500">Successfully created new post!</p>
            )}
            <div className="flex flex-row items-center justify-end gap-3">
              <DialogClose asChild onClick={() => setState(initialState)}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <SaveButton successState={state.success} />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SaveButton({ successState }: { successState: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || successState}>
      Save
    </Button>
  );
}
