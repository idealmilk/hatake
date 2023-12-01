import { SignOutAPI } from "@/lib/firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AvatarMenu from "./AvatarMenu";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { IconContext } from "react-icons";
import { LuSearch } from "react-icons/lu";

export default function Header() {
  const router = useRouter();
  let user = auth.currentUser;

  const signOut = async () => {
    try {
      let res = await SignOutAPI();
      toast.success("Successfully signed out");
      router.push("/");
    } catch (err: any) {
      console.log(err);
      toast.error("Could not sign out");
    }
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <div onClick={() => router.push("/")} className="flex items-center">
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              /> */}
              <span className="self-center text-xl font-semibold whitespace-nowrap text-orange dark:text-white">
                hatake
              </span>
            </div>
            <li>
              <p
                onClick={() => router.push("/search")}
                className="block py-2 pr-4 pl-3  rounded bg-primary-700 hover:text-orange lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                aria-current="page"
              >
                Find Jobs
              </p>
            </li>
            <li>
              <p
                onClick={() => router.push("/")}
                className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:text-orange lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                My Jobs
              </p>
            </li>
          </ul>

          <div className="flex items-center lg:order-2">
            <div className="flex justify-between border border-gray-300 rounded-full py-2 px-4 mr-6">
              <div className="flex">
                <IconContext.Provider value={{ color: "black", size: "1.4em" }}>
                  <div onClick={() => router.push("/sign-in")} className="mr-2">
                    <LuSearch />
                  </div>
                </IconContext.Provider>
                <p className="pr-20">Search</p>
              </div>
              <div className="border-l pl-3">Work</div>
            </div>

            {user && (
              <>
                <IconContext.Provider value={{ color: "black", size: "1.7em" }}>
                  <div onClick={() => router.push("/sign-in")} className="mr-6">
                    <IoPaperPlaneOutline />
                  </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ color: "black", size: "1.8em" }}>
                  <div onClick={() => router.push("/sign-in")} className="mr-2">
                    <GoBell />
                  </div>
                </IconContext.Provider>

                <AvatarMenu />
              </>
            )}
            {!user && (
              <>
                <p
                  onClick={() => router.push("/sign-in")}
                  className="text-gray-800 dark:text-white hover:text-orange focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 cursor-pointer focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </p>
                <p
                  onClick={() => router.push("/register")}
                  className="text-white bg-orange hover:opacity-90 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 cursor-pointer focus:outline-none dark:focus:ring-primary-800"
                >
                  Get started
                </p>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
