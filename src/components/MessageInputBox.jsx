import React from "react";
import Textarea from "react-textarea-autosize";

const MessageInputBox = ({ value, onChange, disabled, onSend }) => {
  return (
    <div
      className="fixed bg-white bottom-0 px-1.5"
      style={{ width: "inherit" }}
    >
      <div className="flex justify-center items-center my-1.5 bg-white">
        <div className="flex-grow m-2 ml-5 h-auto r-1 rounded-lg text-sm border border-gray-300 py-3 px-4 bg-white">
          <Textarea
            placeholder="Type your message..."
            name="message"
            onChange={onChange}
            value={value}
            disabled={disabled}
            className="w-11/12 resize-none outline-none"
          />
        </div>
        <button
          type="button"
          className="m-1 outline-none border rounded-full mr-4 p-2 border-red-100 bg-red-100"
          onClick={onSend}
          style={{ width: "5%" }}
        >
          <svg
            className="text-red-500"
            aria-hidden="true"
            style={{ width: "100%" }}
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInputBox;