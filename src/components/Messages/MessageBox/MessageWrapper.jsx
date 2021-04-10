import React from "react";

const MessageWrapper = ({ children }) => {
  return (
    <div
      className="relative overflow-scroll no-scrollbar"
      style={{ width: "100%", height: "100vh" }}
    >
      {children}
    </div>
  );
};

export default MessageWrapper;
