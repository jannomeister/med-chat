import React from "react";

const MessageWrapper = ({ children }) => {
  return (
    <div
      className="relative overflow-scroll w-"
      style={{ width: "50rem", height: "100vh" }}
    >
      {children}
    </div>
  );
};

export default MessageWrapper;
