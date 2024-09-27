"use client";

import { addTodoSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { createTodo } from "@/actions/todo.action";

function AddTodo() {
  const { user } = useUser();

  const form = useForm<z.infer<typeof addTodoSchema>>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: { title: "" },
  });

  function onSubmit(values: z.infer<typeof addTodoSchema>) {
    const promise = createTodo(values.title, user?.id as string).then(() => {
      form.reset();
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully created!",
      error: "Something went wrong",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-end">
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Form>
  );
}

export default AddTodo;
