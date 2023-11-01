import Link from "next/link";
import React from "react";

function SuccessfulRegistration() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-yellow-400">
        <h1 className="text-xl font-bold my-4">
          You have successfully registered
        </h1>
        <Link
          href="/"
          className="button w-full text-center my-1 mx-auto block bg-yellow-300 text-black border-none hover:bg-yellow-400"
        >
          To the main page
        </Link>
      </div>
    </div>
  );
}

export default SuccessfulRegistration;
