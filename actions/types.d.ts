import { IUser } from "@/types";

export interface ICreateUser {
  clerkId: string;
  fullName: string;
  picture: string;
  email: string;
}

export interface IUpdateUser {
  clerkId: string;
  path?: string;
  updatedData: Partial<IUser>;
}
