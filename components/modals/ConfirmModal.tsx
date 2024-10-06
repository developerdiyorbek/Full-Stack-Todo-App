"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteTodo } from "@/actions/todo.action";
import { toast } from "sonner";

interface Props {
  todoId: string;
}

function ConfirmModal({ todoId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    const promise = deleteTodo(todoId).finally(() => setLoading(false));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully deleted!",
      error: "Something went wrong",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size={"icon"}>
          <Trash2 className="size-[18px] md:size-[22px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="destructive">Cancel</Button>
          <Button
            variant="secondary"
            className="max-sm:mb-2"
            onClick={handleDelete}
            disabled={loading}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmModal;
