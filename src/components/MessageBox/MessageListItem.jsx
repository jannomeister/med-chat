import React from "react";
import { format, formatDistance } from "date-fns";

const MessageListItem = React.forwardRef((props, ref) => {
  const { message, isOwner } = props;

  const date = message.sentAt ? message.sentAt.toDate().getTime() : Date.now();
  // const sentAt = formatDistance(date, new Date(), { addSuffix: true });
  const sentAtTime = format(date, "hh:mm aa");
  const { sentBy: owner } = message;

  const containerClassnames = [
    "flex",
    isOwner ? "flex-col" : "flex-row",
    "mx-4",
    "my-2",
    "p-2",
    "w-3/4",
    isOwner ? "self-end items-end" : "self-start",
  ].join(" ");

  const nameClassnames = [
    "text-xs",
    "text-gray-400",
    "mb-1",
    isOwner ? "text-right" : "",
  ].join(" ");

  const hasFileContainerClassnames = [
    "border",
    "border-gray-200",
    "rounded-t-lg",
    "p-4",
    "text-sm",
    isOwner ? "bg-gray-200" : "bg-indigo-600",
    isOwner ? "rounded-bl-lg" : "rounded-br-lg",
  ].join(" ");

  const fileContainerClassnames = [
    "border",
    isOwner ? "border-gray-300" : "border-indigo-600",
    "rounded-lg",
    "bg-white",
    "mt-2",
  ].join(" ");

  const messageContainerClassnames = [
    "text-sm",
    isOwner ? "text-black" : "text-white",
  ].join(" ");

  return (
    <div className={containerClassnames} ref={ref}>
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

      <div>
        <h1 className={nameClassnames}>
          {!isOwner
            ? owner.displayName
              ? owner.displayName
              : owner.email
            : "You"}
          , {sentAtTime}
        </h1>

        {!message.hasFile && !message.hasGif ? (
          <div className={hasFileContainerClassnames}>
            <p className={messageContainerClassnames}>{message.messageText}</p>
          </div>
        ) : message.hasFile ? (
          <div className={hasFileContainerClassnames}>
            {message.files.map((file) => (
              <>
                {message.messageText ? (
                  <p className={messageContainerClassnames}>
                    {message.messageText}
                  </p>
                ) : null}
                <img src={file} className={fileContainerClassnames} />
              </>
            ))}
          </div>
        ) : message.hasGif ? (
          <img src={message.gif} alt="GIF Image" />
        ) : null}
      </div>
    </div>
  );
});

export default MessageListItem;
