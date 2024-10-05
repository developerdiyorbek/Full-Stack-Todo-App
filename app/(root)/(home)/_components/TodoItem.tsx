"use client";

import { ITodo } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { completedTodo, deleteTodo } from "@/actions/todo.action";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  todo: ITodo;
}

function TodoItem({ todo }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletedLoading, setIsDeletedLoading] = useState(false);

  const handleCompleted = async (checked: boolean) => {
    setIsLoading(true);
    const promise = completedTodo(todo._id, checked).finally(() =>
      setIsLoading(false)
    );

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully completed!",
      error: "Something went wrong",
    });
  };

  const handleDelete = () => {
    setIsDeletedLoading(true);
    const promise = deleteTodo(todo._id).finally(() =>
      setIsDeletedLoading(false)
    );

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully deleted!",
      error: "Something went wrong",
    });
  };

  return (
    <li
      className={`border p-3 rounded-lg flex items-center justify-between ${
        todo.completed ? "bg-gray-200" : ""
      }`}
    >
      <label className="flex items-center cursor-pointer">
        <Checkbox
          defaultChecked={todo.completed}
          onCheckedChange={handleCompleted}
          className="mr-2 md:size-[18px]"
          disabled={isLoading}
        />
        <span className="max-sm:text-[14px]">{todo.title}</span>
      </label>
      <div className="flex space-x-2">
        {" "}
        <Button size={"icon"} variant={"ghost"}>
          <Pencil className="size-[18px] md:size-[22px]" />
        </Button>
        <Button
          variant="destructive"
          size={"icon"}
          onClick={handleDelete}
          disabled={isDeletedLoading}
        >
          <Trash2 className="size-[18px] md:size-[22px]" />
        </Button>
      </div>
    </li>
  );
}

export default TodoItem;
