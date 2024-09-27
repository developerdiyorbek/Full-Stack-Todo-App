import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import UserBox from "./UserBox";

function Header() {
  return (
    <header className="fixed inset-0 z-40 h-20 bg-background/70 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between  sm:container max-sm:px-2">
        <Logo />
        <div className="flex items-center gap-2">
          <ModeToggle />
          <SignedIn>
            <UserBox />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button size={"lg"} className="hidden md:flex rounded-full">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"icon"} className="md:hidden">
                <LogIn />
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

export default Header;
