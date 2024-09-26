import Header from "@/components/shared/Header";
import { ChildProps } from "@/types";

function Layout({ children }: ChildProps) {
  return (
    <>
      <Header />
      <main className="mt-24 container mx-auto">{children}</main>
    </>
  );
}

export default Layout;
