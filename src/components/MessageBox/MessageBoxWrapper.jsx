import React from "react";
import MessageSendButton from "./MessageSendButton";

const MessageBoxWrapper = (props) => {
  return (
    <div className="absolute bottom-0 flex justify-center items-center mt-1.5 bg-white w-full">
      <div className="flex flex-grow m-2 ml-5 h-auto r-1 rounded-lg text-sm border border-gray-300 py-3 px-4 bg-white">
        {props.children}
      </div>
      <MessageSendButton onSend={props.onSend} />
    </div>
  );
};

export default MessageBoxWrapper;
