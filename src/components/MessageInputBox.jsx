import React, { useRef } from "react";
import Textarea from "react-textarea-autosize";

const MessageInputBox = ({ value, onChange, disabled, onSend }) => {
  const inputFileRef = useRef(null);

  const onOpenFile = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="absolute bottom-0 flex justify-center items-center mt-1.5 bg-white w-full">
      <div className="flex flex-grow m-2 ml-5 h-auto r-1 rounded-lg text-sm border border-gray-300 py-3 px-4 bg-white">
        <Textarea
          placeholder="Type your message..."
          name="message"
          onChange={onChange}
          value={value}
          disabled={disabled}
          className="w-full resize-none outline-none"
        />
        <button
          type="button"
          className="text-gray-500 w-6"
          onClick={onOpenFile}
        >
          <svg
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <input type="file" ref={inputFileRef} className="hidden" />
      </div>
      <button
        type="button"
        className="m-1 outline-none border rounded-full mr-4 p-2 border-red-100 bg-red-100 text-red-500 "
        onClick={onSend}
      >
        <svg
          aria-hidden="true"
          className="w-4"
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
  );
};

export default MessageInputBox;
