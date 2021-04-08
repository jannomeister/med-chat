import React from "react";

const CreateGroupIcon = ({ onClick, isActive }) => {
  const mainClassnames = [
    "mt-2",
    "px-3",
    "py-2",
    "text-white",
    "cursor-pointer",
    "hover:bg-indigo-500",
    "hover:rounded",
    isActive ? "bg-indigo-500 rounded" : "",
  ].join(" ");

  return (
    <div className={mainClassnames} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
};

export default CreateGroupIcon;
