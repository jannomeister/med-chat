import React from "react";
import { formatDistance } from "date-fns";

const GroupChatView = React.forwardRef((props, ref) => {
  const { item, isSender } = props;
  const sentAt = item.sentAt
    ? item.sentAt.toDate().toLocaleString()
    : new Date().getTime();

  return (
    <div
      className={`min-w-min max-w- mx-4 mt-2 mb-2 p-2 ${
        isSender ? "self-end" : "self-start"
      }`}
      style={{ maxWidth: "80%" }}
      ref={ref}
    >
      <div
        className={`border border-gray-200 p-4 text-sm rounded-lg rounded-${
          isSender ? "br" : "bl"
        }-none ${isSender ? "bg-gray-200" : "bg-indigo-700 text-white"}`}
      >
        {item.messageText}
      </div>
      <p
        className={`text-xs text-gray-500 ${
          isSender ? " text-right" : " text-left"
        }`}
      >
        {formatDistance(new Date(sentAt), new Date(), { addSuffix: true })}
      </p>
    </div>
  );
});

export default GroupChatView;
