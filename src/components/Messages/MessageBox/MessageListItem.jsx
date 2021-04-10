import React from "react";
import { format } from "date-fns";

// components
import Masonry from "react-masonry-css";

const MessageListItem = React.forwardRef((props, ref) => {
  const { message: msgObj, isOwner } = props;

  const { sentBy: owner, ...message } = msgObj;

  const date = message.sentAt ? message.sentAt.toDate().getTime() : Date.now();
  const sentAtTime = format(date, "hh:mm aa");

  const images = message.hasFile
    ? message.files.filter((file) => file.contentType.startsWith("image/"))
    : [];
  const otherFiles = message.hasFile
    ? message.files.filter((file) => !file.contentType.startsWith("image/"))
    : [];

  return (
    <div
      className={[
        "flex",
        isOwner ? "flex-col" : "flex-row",
        "mx-4",
        "my-2",
        "p-2",
        "w-3/4",
        isOwner ? "self-end items-end" : "self-start",
      ].join(" ")}
      ref={ref}
    >
      {!isOwner ? (
        <div className="flex flex-col justify-end min-w-max">
          <img
            src={owner.photoURL}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/fallback_img.webp";
            }}
            className="rounded-full mr-2 bg-black w-10 h-10"
          />
        </div>
      ) : null}

      <div className="w-full">
        <h1
          className={[
            "text-xs",
            "text-gray-400",
            "mb-1",
            isOwner ? "text-right" : "",
          ].join(" ")}
        >
          {!isOwner
            ? owner.displayName
              ? owner.displayName
              : owner.email
            : "You"}
          , {sentAtTime}
        </h1>

        {message.messageText ? (
          <div
            className={[
              "border",
              "border-gray-200",
              "rounded-t-lg",
              "p-4",
              "text-sm",
              "w-full",
              "max-w-min",
              isOwner ? "float-right" : "",
              isOwner ? "bg-indigo-600" : "bg-gray-200",
              isOwner ? "rounded-bl-lg" : "rounded-br-lg",
            ].join(" ")}
          >
            <p
              className={[
                "text-sm",
                "break-words",
                "font-semibold",
                isOwner ? "text-white" : "text-black",
              ].join(" ")}
            >
              {message.messageText}
            </p>
          </div>
        ) : null}

        <div className="clear-both" />

        {message.hasFile ? (
          <div
            className={[
              "flex flex-col",
              isOwner ? "items-end justify-end" : "items-start justify-start",
            ].join(" ")}
          >
            <Masonry
              className={[
                "flex w-auto",
                "w-8/12",
                isOwner ? "flex-row-reverse" : "flex-row",
              ].join(" ")}
              columnClassName="pl-2 bg-clip-padding"
            >
              {images.map((img) => (
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.url}
                  className={[
                    "border",
                    "rounded-lg",
                    "bg-white",
                    "mt-1",
                    "cursor-pointer",
                  ].join(" ")}
                />
              ))}
            </Masonry>

            <div className="flex items-center h-full border-none mt-3 px-2 py-3 bg-gray-600 w-40 rounded-lg">
              {otherFiles.map((otherFile) => (
                <div
                  key={otherFile.url}
                  className="flex items-center text-base cursor-pointer w-full"
                  onClick={() => window.open(otherFile.url, "_blank")}
                >
                  <div className="flex items-center justify-center mr-1 w-8 h-8 rounded-full min-w-max bg-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <p className="w-3/4 overflow-hidden overflow-ellipsis text-white font-semibold">
                    {otherFile.filename ? otherFile.filename : "Unknown File"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : message.hasGif ? (
          <img
            src={message.gif}
            alt={message.gif}
            className={isOwner ? "float-right" : "float-left"}
          />
        ) : null}
      </div>
    </div>
  );
});

export default MessageListItem;
