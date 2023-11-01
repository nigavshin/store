import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Logout from "./logout";

async function Header() {
  const session = await getServerSession();
  return (
    <header className="flex items-center px-4 md:px-12 py-4 justify-between fixed top-0 w-full bg-white z-50 shadow">
      <Link href="/" scroll={false}>
        <Image
          src="/logo.svg"
          width={80}
          height={80}
          priority={true}
          alt="Logo"
        />
      </Link>

      <div className="flex items-center space-x-2.5 text-sm">
        {!!session && <Logout />}

        {!session && (
          <Link
            scroll={false}
            className="button bg-yellow-300 text-black border-none hover:bg-yellow-400"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
