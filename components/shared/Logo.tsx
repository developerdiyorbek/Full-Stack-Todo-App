import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <div className="relative size-11 max-sm:size-9">
        <Image src={"/icon.webp"} alt="logo" fill />
      </div>
      <h1 className="font-space-grotesk text-2xl font-bold max-sm:text-lg">
        Todo App
      </h1>
    </Link>
  );
};

export default Logo;
