import React from "react";
import { Picker } from "emoji-mart";
import OutsideClickHandler from "react-outside-click-handler";
import "emoji-mart/css/emoji-mart.css";

const MessageEmojiButton = ({ open, onClick, onOutsideClick, onSelect }) => {
  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <div
        className={`absolute ${!open ? "hidden" : "visible"}`}
        style={{ bottom: "55px", right: "10px" }}
      >
        <Picker onSelect={(e) => onSelect(e.native)} />
      </div>
      <button type="button" className="text-gray-500 w-6" onClick={onClick}>
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
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </OutsideClickHandler>
  );
};

export default MessageEmojiButton;
