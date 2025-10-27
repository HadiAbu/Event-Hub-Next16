import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <header>
        <nav className="flex items-center justify-between p-4">
          <Link href="/" className="logo">
            <Image src="/icons/logo.png" alt="logo" width={25} height={25} />
            <span className="ml-2 font-bold text-xl">EventHub</span>
          </Link>
          <div className="justify-right space-x-4">
            <Link href="/">
              <span>Explore</span>
            </Link>
            <Link href="/">About</Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
