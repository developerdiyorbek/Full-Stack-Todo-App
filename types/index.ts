import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface IUser {
  _id: string;
  clerkId: string;
  fullName: string;
  email: string;
  picture: string;
  role: string;
}

export interface ITodo {
  _id: string;
  title: string;
  userId: string;
  completed: boolean;
  createdAt: number;
}
