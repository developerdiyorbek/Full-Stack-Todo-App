"use server";

import User from "@/database/User.Model";
import { ICreateUser, IUpdateUser } from "./types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongoose";

export const createUser = async (data: ICreateUser) => {
  try {
    await connectToDatabase();
    const { clerkId, email, fullName, picture } = data;
    const isExist = await User.findOne({ clerkId });

    if (isExist) {
      const updatedUser = User.findByIdAndUpdate(
        { email },
        {
          clerkId,
          fullName,
          picture,
        },
        {
          new: true,
        }
      );

      return updatedUser;
    }

    const newUser = User.create(data);

    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error("Error create user. Try again");
  }
};

export const getUser = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user. Please try again.");
  }
};

export const updateUser = async (data: IUpdateUser) => {
  try {
    await connectToDatabase();
    const { updatedData, clerkId, path } = data;

    const updatedUser = await User.findOneAndUpdate({ clerkId }, updatedData);
    if (path) return revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error(error);
  }
};
