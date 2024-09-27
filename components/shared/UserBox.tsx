"use client";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import useUser from "@/hooks/useUser";

import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserBox = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 cursor-pointer">
          <AvatarImage src={user?.picture} className="object-cover" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="center">
        <DropdownMenuGroup>
          <div className="flex flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.email}
            </p>

            <div className="flex items-center gap-x-2">
              <div className="rounded-md bg-secondary p-1">
                <Avatar className="size-8">
                  <AvatarImage
                    src={user?.picture}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Avatar>
              </div>

              <div className="space-y-1">
                <p className="line-clamp-1 font-space-grotesk text-sm">
                  {user?.fullName}
                </p>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <Link href={"/profile"}>
            <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
              Manage account
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            asChild
            className="w-full cursor-pointer text-muted-foreground"
          >
            <SignOutButton>Log out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBox;
