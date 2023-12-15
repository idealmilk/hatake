import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import "flowbite";

import { UserProvider } from "@/context/UserContext";
import { NotificationsProvider } from "@/context/NotificationsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </UserProvider>
    </>
  );
}
