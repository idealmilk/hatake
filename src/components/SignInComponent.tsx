import { useRouter } from "next/navigation";
import { SignInAPI, GoogleSignInAPI } from "@/lib/firebase/auth";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";

export default function SignInComponent() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const signIn = async () => {
    try {
      let res = await SignInAPI(credentials);
      toast.success("Signed in to LinkedIn");
      router.push("/");
    } catch (err: any) {
      console.log(err);
      toast.error("Please check your credentials");
    }
  };

  const signInWithGoogle = async () => {
    try {
      let res = await GoogleSignInAPI();
      toast.success("Signed in to LinkedIn");
      router.push("/");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Sign In Component</h1>
      <p>Stay updated on your professional world</p>
      <div>
        <input
          className="block"
          onChange={(event) => {
            setCredentials({ ...credentials, email: event.target.value });
          }}
          placeholder="Email or Phone"
          type="email"
        />
        <input
          className="block"
          onChange={(event) => {
            setCredentials({ ...credentials, password: event.target.value });
          }}
          placeholder="Password"
          type="password"
        />
        <button className="block" onClick={signIn}>
          Sign in
        </button>
      </div>
      <GoogleButton onClick={signInWithGoogle} />
      <p>
        New to LinkedIn?
        <span onClick={() => router.push("/register")}>Join now</span>
      </p>
    </div>
  );
}
