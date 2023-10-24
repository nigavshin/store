import GoogleButton from "@/components/GoogleButton";
import SignInForm from "@/components/SignInForm";

export default async function SignIn() {
  return (
    <div className="my-40">
      <h1>SignIn</h1>
      <GoogleButton />
      <div>or</div>
      <SignInForm />
    </div>
  );
}
