import React from "react";
import OutsideClickHandler from "../../OutsideClickHandler";
import ReactGiphySearchbox from "../../ReactGiphySearchbox";

const MessageGifButton = ({
  open = false,
  onClick,
  onOutsideClick,
  onSelect,
}) => {
  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <div
        className={`absolute ${!open ? "hidden" : "visible"}`}
        style={{ bottom: "55px", right: "10px" }}
      >
        <ReactGiphySearchbox
          apiKey={import.meta.env.VITE_GIPHY_API_KEY}
          onSelect={(e) =>
            onSelect(`https://media.giphy.com/media/${e.id}/giphy.gif`)
          }
          masonryConfig={[
            { columns: 2, imageWidth: 110, gutter: 5 },
            { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
          ]}
        />
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
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      </button>
    </OutsideClickHandler>
  );
};

export default MessageGifButton;
