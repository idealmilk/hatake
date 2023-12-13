import { useCurrentUser } from "@/context/UserContext";
import { SignOutAPI } from "@/lib/firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AvatarMenu() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useCurrentUser();

  const signOut = async () => {
    try {
      await SignOutAPI();
      toast.success("Successfully signed out");
      router.push("/");
    } catch (err: any) {
      console.log(err);
      toast.error("Could not sign out");
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center ">
      <div className="group relative cursor-pointer py-2">
        <div className="flex items-center justify-between">
          <a className="menu-hover text-base font-medium text-black lg:mx-4">
            <div
              className={`w-10 h-10 rounded-full cursor-pointer ${
                currentUser?.displayPicURL ? "bg-cover bg-center" : "bg-green"
              }`}
              style={{
                backgroundImage: currentUser?.displayPicURL
                  ? `url(${currentUser.displayPicURL})`
                  : "none",
              }}
            />
          </a>
        </div>
        <div className="invisible absolute right-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 group-hover:visible">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{currentUser?.displayName}</div>
            <div className="font-medium truncate">{currentUser?.email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <p
                onClick={() => router.push("/profile")}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </p>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <p
                onClick={signOut}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
