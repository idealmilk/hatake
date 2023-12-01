export default function PostCard(post: any) {
  return (
    <div className="bg-white border shadow-sm px-4 py-3 rounded-lg max-w-lg">
      <div className="flex items-center">
        <img
          className="h-12 w-12 rounded-full"
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
        <div className="ml-2">
          <div className="text-sm ">
            <span className="font-semibold">{post.userDisplayName}</span>
            <span className="text-gray-500"> • 1st</span>
          </div>
          <div className="text-gray-500 text-xs ">
            Software Engineer at Tesla, Inc
          </div>
          <div className="text-gray-500 text-xs flex">
            <span className="inline-block">{post.timeStamp} • </span>
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
      <div className="text-gray-500 text-xs flex items-center mt-3">
        <img
          className="mr-0.5"
          src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
        />
        <img
          className="mr-0.5"
          src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
        />
        <img
          className="mr-0.5"
          src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"
        />
        <span className="ml-1">47 • 26 comments</span>
      </div>
    </div>
  );
}
