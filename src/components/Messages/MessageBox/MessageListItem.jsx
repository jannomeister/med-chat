import React from "react";
import { format, formatDistance } from "date-fns";

// components
import Masonry from "react-masonry-css";

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

  const messageContainerClassnames = [
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
  ].join(" ");

  const fileContainerClassnames = [
    "border",
    "rounded-lg",
    "bg-white",
    "mt-1",
  ].join(" ");

  const imagesContainerClassnames = [
    "flex w-auto",
    isOwner ? "flex-row-reverse" : "flex-row",
  ].join(" ");

  const messageClassnames = [
    "text-sm",
    "break-words",
    "font-semibold",
    isOwner ? "text-white" : "text-black",
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

      <div className="w-full">
        <h1 className={nameClassnames}>
          {!isOwner
            ? owner.displayName
              ? owner.displayName
              : owner.email
            : "You"}
          , {sentAtTime}
        </h1>

        {message.messageText ? (
          <div className={messageContainerClassnames}>
            <p className={messageClassnames}>{message.messageText}</p>
          </div>
        ) : null}

        <div className="clear-both" />

        {message.hasFile ? (
          <Masonry
            className={imagesContainerClassnames}
            columnClassName="pl-2 bg-clip-padding"
          >
            {message.files.map((file) => (
              <img key={file} src={file} className={fileContainerClassnames} />
            ))}
          </Masonry>
        ) : message.hasGif ? (
          <img
            src={message.gif}
            alt="GIF Image"
            className={isOwner ? "float-right" : "float-left"}
          />
        ) : null}
      </div>
    </div>
  );
});

export default MessageListItem;
