"use server";

import Todo from "@/database/Todo.model";
import { connectToDatabase } from "@/lib/mongoose";

export const createTodo = async (title: string, userId: string) => {
  try {
    await connectToDatabase();
    console.log(title, userId);
    const newTodo = await Todo.create({ title, userId });
    return JSON.parse(JSON.stringify(newTodo));
  } catch (error) {
    console.log(error);
  }
};
