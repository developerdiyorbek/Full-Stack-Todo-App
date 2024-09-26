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
