"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { validationSchemaLogin } from "@/schemas";

const DEFAULT_STATE_FORM = {
  email: "",
  password: "",
};

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: DEFAULT_STATE_FORM,
    validationSchema: validationSchemaLogin,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmit(values.email, values.password);
    },
  });

  const handleSubmit = async (email: string, password: string) => {
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!response?.error) {
      router.push("/");
      router.refresh();
    } else {
      setError("User not found");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="relative shadow-lg p-5 rounded-lg border-t-4 border-yellow-400">
        <Link href={"/"} className="block w-4 absolute top-5 right-7">
          <XMarkIcon width={25} />
        </Link>
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <input
            name="email"
            type="text"
            placeholder="Email"
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
              {formik.errors.email}
            </p>
          ) : null}
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
              {formik.errors.password}
            </p>
          ) : null}
          <button className="button w-full my-1 mx-auto block bg-yellow-300 text-black border-none hover:bg-yellow-400">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don&apos;t have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
