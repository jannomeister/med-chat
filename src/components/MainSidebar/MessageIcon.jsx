import React from "react";

const MessageIcon = ({ onClick }) => {
  const mainClassnames = [
    "mt-2",
    "px-3",
    "py-2",
    "text-white",
    "cursor-pointer",
    "hover:bg-indigo-500",
    "hover:rounded",
  ].join(" ");

  return (
    <div className={mainClassnames} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default MessageIcon;
