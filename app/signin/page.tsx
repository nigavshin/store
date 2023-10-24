"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import GoogleButton from "@/components/GoogleButton";
import SignInForm from "@/components/SignInForm";
import { Dialog } from "@headlessui/react";

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
            <h1 className="mb-6 font-bold text-center text-xl">Sign in</h1>
            <SignInForm />
            <div className="font-thin text-center">or</div>
            <GoogleButton />
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
