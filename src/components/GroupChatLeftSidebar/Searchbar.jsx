import React from "react";

const Searchbar = () => {
  return (
    <div className="border-t border-gray-200 px-2 py-2 text-sm">
      <div className="flex items-center border px-3 py-2 text-gray-400 bg-gray-100 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="px-2 w-full rounded-full bg-gray-100"
        />
      </div>
    </div>
  );
};

export default Searchbar;
