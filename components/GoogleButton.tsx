"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function GoogleButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  return (
    <button
      className="button my-5 mx-auto block bg-yellow-300 text-black border-none hover:bg-yellow-400"
      onClick={() => signIn("google", { callbackUrl })}
    >
      Sign in with Google
    </button>
  );
}

export default GoogleButton;
