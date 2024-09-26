import Header from "@/components/shared/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>
        <section className="mt-32 flex items-center justify-center">
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
