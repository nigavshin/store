"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const session = useSession();

  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white z-50 shadow">
      <Link href="/">
        <Image
          src="https://i.ibb.co/McdzmYG/logo-removebg-preview-new.png"
          width={70}
          height={70}
          alt="Logo"
        />
      </Link>

      <div className="flex items-center space-x-2.5 text-sm">
        <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
          Log in
        </button>
        <button className="button bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent">
          Sign up
        </button>
      </div>
      {session?.data && <Link href="/profile">Profile</Link>}

      {session?.data ? (
        <Link
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
        <Link href="/signin">Sign In</Link>
      )}
    </header>
  );
}

export default Header;
