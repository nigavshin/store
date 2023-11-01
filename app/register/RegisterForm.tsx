"use client";

import { validationSchemaRegister } from "@/schemas";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useState } from "react";

const DEFAULT_STATE_FORM = {
  name: "",
  email: "",
  password: "",
};

function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: DEFAULT_STATE_FORM,
    validationSchema: validationSchemaRegister,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleSubmit(values.name, values.email, values.password);
    },
  });

  const handleSubmit = async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await fetch(`api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      setError("Registration failed");
    } else {
      router.push('/successful-registration');
      router.refresh()
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className=" relative shadow-lg p-5 rounded-lg border-t-4 border-yellow-400">
      <Link href={"/"} className="block w-4 absolute top-5 right-7">
          <XMarkIcon width={25}/>
        </Link>
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
          />
          {formik.errors.name ? (
            <p className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
              {formik.errors.name}
            </p>
          ) : null}
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
          <button
            type="submit"
            className="button w-full my-1 mx-auto block bg-yellow-300 text-black border-none hover:bg-yellow-400"
          >
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
