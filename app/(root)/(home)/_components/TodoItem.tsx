"use client";

import { ITodo } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { completedTodo } from "@/actions/todo.action";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/modals/ConfirmModal";
import EditModal from "@/components/modals/EditModal";

interface Props {
  todo: ITodo;
}

function TodoItem({ todo }: Props) {
  const [isLoading, setIsLoading] = useState(false);

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
        <EditModal todo={todo} />
        <ConfirmModal todoId={todo._id} />
      </div>
    </li>
  );
}

export default TodoItem;
