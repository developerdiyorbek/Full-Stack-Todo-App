"use client";

import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { ITodo } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addTodoSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTodoTitle } from "@/actions/todo.action";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  todo: ITodo;
}

function EditModal({ todo }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof addTodoSchema>>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: { title: todo.title },
  });

  function onSubmit(values: z.infer<typeof addTodoSchema>) {
    setLoading(true);

    const promise = updateTodoTitle(todo._id, values.title)
      .then(() => {
        form.reset();
        setOpen(false);
      })
      .finally(() => {
        setLoading(false);
      });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully updated!",
      error: "Something went wrong",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"} onClick={() => setOpen(true)}>
          <Pencil className="size-[18px] md:size-[22px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit todo title</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="title" {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex items-center flex-row justify-end gap-1">
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
