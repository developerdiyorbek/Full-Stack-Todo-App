"use client";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";

function Page() {
  const { user } = useUser();
  console.log(user);

  return (
    <div>
      <Button variant={"outline"}>Click</Button>
    </div>
  );
}

export default Page;
