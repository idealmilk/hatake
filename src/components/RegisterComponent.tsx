import { SignUpAPI, GoogleSignInAPI } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";

export default function RegisterComponent() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const signUp = async () => {
    try {
      let res = await SignUpAPI(credentials);
      toast.success("Account created");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Cannot create your account");
    }
  };

  const signInWithGoogle = async () => {
    try {
      let res = await GoogleSignInAPI();
      toast.success("Signed in to LinkedIn");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen bg-white relative flex flex-col space-y-6 justify-center items-center">
      <div
        onClick={() => router.push("/")}
        className="absolute  top-3 left-5 cursor-pointer"
      >
        <span className="self-center text-3xl font-semibold whitespace-nowrap text-orange dark:text-white">
          hatake
        </span>
      </div>
      <div className="bg-white md:shadow-lg shadow-none rounded p-6 w-96">
        <h1 className="text-3xl font-bold leading-normal">
          Register Component
        </h1>
        <p className="text-sm leading-normal">
          Make the most of your professional life
        </p>
        <form className="space-y-5 mt-5">
          <div className="mb-4 relative">
            <input
              className="w-full rounded px-3 border border-gray-500 pt-5 pb-2 focus:outline-none input active:outline-none"
              onChange={(event) => {
                setCredentials({
                  ...credentials,
                  displayName: event.target.value,
                });
              }}
              placeholder="Your Name"
              type="text"
            />
          </div>

          <div className="mb-4 relative">
            <input
              className="w-full rounded px-3 border border-gray-500 pt-5 pb-2 focus:outline-none input active:outline-none"
              onChange={(event) => {
                setCredentials({
                  ...credentials,
                  email: event.target.value,
                });
              }}
              placeholder="Email or Phone"
              type="email"
            />
          </div>

          <div className="relative flex items-center border border-gray-500 focus:ring focus:border-orange rounded">
            <input
              className="w-full rounded px-3 pt-5 outline-none pb-2 focus:outline-none active:outline-none input active:border-orange"
              onChange={(event) => {
                setCredentials({
                  ...credentials,
                  password: event.target.value,
                });
              }}
              placeholder="Password (6 or more characters)"
              type="password"
            />
          </div>

          <div className="-m-2">
            <a
              className="font-bold text-orange hover:underline rounded-full"
              href="#"
            >
              Forgot password?
            </a>
          </div>

          <button
            className="w-full text-center bg-orange hover:opacity-70 rounded-full text-white py-3 font-medium"
            onClick={signUp}
          >
            Agree & Join
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <GoogleButton onClick={signInWithGoogle} className="m-auto" />
      </div>

      <p>
        Already on LinkedIn?
        <span
          onClick={() => router.push("/sign-in")}
          className="ml-2 text-orange cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );
}
