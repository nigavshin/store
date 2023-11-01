"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

function Logout() {
  return (
    <>
      <Link
        scroll={false}
        className="button bg-yellow-300 text-black border-none hover:bg-yellow-400"
        href="/profile"
      >
        Profile
      </Link>
      <Link
        scroll={false}
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
    </>
  );
}

export default Logout;
