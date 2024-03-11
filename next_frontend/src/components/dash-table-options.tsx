"use client";

import { Ellipsis, Pencil, TextSearch, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { SetStateAction, useEffect, useState } from "react";
import { deletePost, getPostById } from "@/lib/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import type { Dispatch } from "react";
import type { PostState } from "@/lib/definitions";
import { useFormState, useFormStatus } from "react-dom";
import { savePost } from "@/lib/actions";

export function TableOptions({ postId }: { postId: number }) {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="size-8">
            <Ellipsis className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Post Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowDetail(true)}>
            Detail
            <DropdownMenuShortcut>
              <TextSearch className="size-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowEdit(true)}>
            Edit
            <DropdownMenuShortcut>
              <Pencil className="size-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onSelect={() => setShowDelete(true)}
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2 className="size-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PostDetail open={showDetail} setIsOpen={setShowDetail} postId={postId} />
      <PostEdit open={showEdit} setIsOpen={setShowEdit} postId={postId} />
      <PostDelete open={showDelete} setIsOpen={setShowDelete} postId={postId} />
    </>
  );
}
function PostDelete({
  open,
  setIsOpen,
  postId,
}: {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  postId: number;
}) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cant be undone. The post will be deleted forever.
          </DialogDescription>
        </DialogHeader>
        <form action={deletePost}>
          <input type="hidden" name="postid" value={String(postId)} />
          <div className="flex flex-row items-center justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DeleteButton setIsOpen={setIsOpen} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PostDetail({
  open,
  setIsOpen,
  postId,
}: {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  postId: number;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (open) {
      const getData = async () => {
        const data = await getPostById(postId);
        if (!("error" in data)) {
          setTitle(data.title);
          setContent(data.content);
        }
      };
      getData();
    }
  }, [open, postId]);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post Details</DialogTitle>
          <DialogDescription>
            Check the full information of the selected post.
          </DialogDescription>
        </DialogHeader>
        <h3 className="text-md font-bold">Title</h3>
        <p className="text-sm font-medium -mt-2">{title}</p>
        <h3 className="text-md font-bold">Content</h3>
        <p className="text-sm font-medium -mt-2">{content}</p>
      </DialogContent>
    </Dialog>
  );
}

function PostEdit({
  open,
  setIsOpen,
  postId,
}: {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  postId: number;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const initialState = { success: false, databaseError: null, errors: {} };
  const [state, setState] = useState<PostState>(initialState);
  const [postState, dispatch] = useFormState(savePost, initialState);

  useEffect(() => {
    if (open) {
      const getData = async () => {
        const data = await getPostById(postId);
        if (!("error" in data)) {
          setTitle(data.title);
          setContent(data.content);
        }
      };
      getData();
    }
  }, [open, postId]);

  useEffect(() => {
    if (postState) {
      setState(postState);
    }
  }, [postState]);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit the current post</DialogTitle>
          <DialogDescription>
            Enter the title and the content to update the current post.
          </DialogDescription>
        </DialogHeader>
        <form action={dispatch}>
          <input type="hidden" name="update" value="true" />
          <input type="hidden" name="postid" value={String(postId)} />
          <div className="space-y-3">
            <div>
              <Label htmlFor="post-title">Title</Label>
              <Input
                id="post-title"
                name="title"
                maxLength={50}
                onChange={() => setState(initialState)}
                defaultValue={title}
                required
                autoFocus={false}
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
                defaultValue={content}
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
              <p className="text-green-500">Successfully updated post!</p>
            )}
            <div className="flex flex-row items-center justify-end gap-3">
              <DialogClose asChild onClick={() => setState(initialState)}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <EditButton successState={state.success} />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditButton({ successState }: { successState: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || successState}>
      Update
    </Button>
  );
}

function DeleteButton({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="destructive"
      type="submit"
      disabled={pending}
      onClick={() => setIsOpen(false)}
    >
      Delete
    </Button>
  );
}
