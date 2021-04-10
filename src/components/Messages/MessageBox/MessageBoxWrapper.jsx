import React from "react";

const MessageBoxWrapper = (props) => {
  return (
    <div className="absolute bottom-0 flex justify-center items-center mt-1.5 mb-2 bg-white w-full">
      <div className="flex flex-col flex-grow mx-5  h-auto r-1 rounded-md text-sm border border-gray-300 bg-white">
        {props.children}
      </div>
    </div>
  );
};

export default MessageBoxWrapper;
