import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import "flowbite";

import { UserProvider } from "@/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
