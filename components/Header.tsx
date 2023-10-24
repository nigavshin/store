"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const session = useSession();

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
        {session?.data && (
          <Link scroll={false}
            className="button bg-yellow-300 text-black border-none hover:bg-yellow-400"
            href="/profile"
          >
            Profile
          </Link>
        )}

        {session?.data ? (
          <Link scroll={false}
            className="button bg-transparent border-yellow-300 hover:bg-yellow-400 hover:text-black hover:border-yellow-400"
            href="#"
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
            }}
          >
            Sign out
          </Link>
        ) : (
          <Link scroll={false}
            className="button bg-yellow-300 text-black border-none hover:bg-yellow-400"
            href="/signin"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
