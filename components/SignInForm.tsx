"use client";

import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { useState } from "react";
import { validationSchema } from "@/schemas";

const DEFAULT_STATE_FORM = {
  email: "",
  password: "",
};

function SignInForm() {
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: DEFAULT_STATE_FORM,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/profile");
    } else {
      console.log(res);
      setError(true);
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="flex flex-col">
    <form
      onSubmit={(event) => {
        formik.handleSubmit();
        handleSubmit(event);
      }}
      className="flex flex-col"
    >
      <div className="flex rounded-md shadow-sm ring-1 ring-inset mb-2 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-400 sm:max-w-md">
        <input
          type="text"
          name="email"
          autoComplete="email"
          required
          className="block outline-none flex-1 border-0 bg-transparent py-2.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Email"
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.email ? (
        <p className="mb-1.5 text-xs	text-orange-600">{formik.errors.email}</p>
      ) : null}
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-yellow-400 sm:max-w-md">
        <input
          type="password"
          name="password"
          autoComplete="password"
          required
          className="block outline-none flex-1 border-0 bg-transparent py-2.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Password"
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.password ? (
        <p className="mt-1.5 text-xs	text-orange-600">
          {formik.errors.password}
        </p>
      ) : null}

      {error && (
        <p className="text-xs	text-orange-600">
          We didn't find your account, please try again
        </p>
      )}
      <button
        className="button w-full my-4 mx-auto block bg-yellow-300 text-black border-none hover:bg-yellow-400"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
}

export default SignInForm;
