'use client'

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function GoogleButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  return (
    <button onClick={() => signIn("google", { callbackUrl })}>
      Sign in with Google
    </button>
  );
}

export default GoogleButton;
