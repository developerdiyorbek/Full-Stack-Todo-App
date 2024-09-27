"use server";

import Todo from "@/database/Todo.model";
import { connectToDatabase } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";

export const createTodo = async (title: string, userId: string) => {
  try {
    await connectToDatabase();
    const newTodo = await Todo.create({ title, userId });
    revalidatePath("/");
    return JSON.parse(JSON.stringify(newTodo));
  } catch (error) {
    console.log(error);
  }
};

export const getTodos = async (userId: string) => {
  try {
    await connectToDatabase();
    const todos = await Todo.find({ userId });
    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    console.log(error);
  }
};
