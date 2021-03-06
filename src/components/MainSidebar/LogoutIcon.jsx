import React from "react";

const LogoutIcon = ({ onClick }) => {
  return (
    <div className="px-5 py-3">
      <button type="button" className="text-white" onClick={onClick}>
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
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  );
};

export default LogoutIcon;
