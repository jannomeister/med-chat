import React from "react";

const MessageFileIndicator = ({ show = false }) => {
  return (
    <button
      type="button"
      className={`text-gray-500 w-7 rounded-full px-1 mr-1 bg-gray-200 ${
        show ? "visible" : "hidden"
      }`}
    >
      <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default MessageFileIndicator;
