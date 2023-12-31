import { formatTimeStamp } from "@/helpers/useMoment";
import { GetUserById } from "@/lib/firebase/firestore/Users";
import { PostType } from "@/types/post";
import { UserType } from "@/types/user";
import { useMemo, useState } from "react";
import PostLike from "./PostLike";
import { useCurrentUser } from "@/context/UserContext";

export default function PostCard(post: PostType) {
  const [singleUser, setSingleUser] = useState<UserType | null>(null);

  useMemo(() => {
    GetUserById(post.userId, setSingleUser);
  }, []);

  const { currentUser } = useCurrentUser();

  if (!singleUser) {
    return <p>Loading</p>;
  }

  return (
    <div className="bg-white border shadow-sm px-4 py-3 rounded-lg max-w-lg">
      <div className="flex items-center">
        <div
          className={`h-12 w-12 rounded-full cursor-pointer ${
            singleUser?.displayPhoto ? "bg-cover bg-center" : "bg-green"
          }`}
          style={{
            backgroundImage: singleUser?.displayPhoto
              ? `url(${singleUser.displayPhoto})`
              : "none",
          }}
        />
        <div className="ml-2">
          <div className="text-sm ">
            <span className="font-semibold">{singleUser?.displayName}</span>
            <span className="text-gray-500"> • 1st</span>
          </div>
          <div className="text-gray-500 text-xs ">
            Software Engineer at Tesla, Inc
          </div>
          <div className="text-gray-500 text-xs flex">
            <span className="inline-block">
              {formatTimeStamp(post.timeStamp)} •{" "}
            </span>
            <svg
              className="inline-block ml-1 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              data-supported-dps="16x16"
              fill="currentColor"
              width="16"
              height="16"
              focusable="false"
            >
              <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
            </svg>
          </div>
        </div>
      </div>
      <p className="text-gray-800 text-sm mt-2 leading-normal md:leading-relaxed">
        {post.body}
      </p>

      <PostLike userId={currentUser?.id} postId={post.id} />
    </div>
  );
}
