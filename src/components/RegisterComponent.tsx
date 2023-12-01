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
    } catch (err: any) {
      console.log(err);
      toast.error("Cannot create your account");
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
      <h1>Register Component</h1>
      <p>Make the most of your professional life</p>
      <div>
        <input
          className="block"
          onChange={(event) => {
            setCredentials({ ...credentials, displayName: event.target.value });
          }}
          placeholder="Your Name"
          type="text"
        />
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
          placeholder="Password (6 or more characters)"
          type="password"
        />
        <button className="block" onClick={signUp}>
          Agree & Join
        </button>
      </div>
      <GoogleButton onClick={signInWithGoogle} />
      <p>
        Already on LinkedIn?
        <span onClick={() => router.push("/login")}>Sign in</span>
      </p>
    </div>
  );
}
