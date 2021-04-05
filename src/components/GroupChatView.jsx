import React from "react";
import { formatDistance } from "date-fns";

const SenderMessage = React.forwardRef(({ messageText, sentAt }, ref) => {
  return (
    <div className="max-w-min mx-4 mt-2 mb-2 p-2 w-3/4 self-end" ref={ref}>
      <div className="border border-gray-200 p-4 text-sm rounded-lg rounded-br-none bg-gray-200">
        <p className="break-words">{messageText}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 mt-1 text-right">{sentAt}</p>
      </div>
    </div>
  );
});

const OtherMessage = React.forwardRef(({ messageText, sentAt }, ref) => {
  return (
    <div className="max-w-min mx-4 mt-2 mb-2 p-2 w-3/4 self-start" ref={ref}>
      <div className="border border-gray-200 p-4 text-sm rounded-lg rounded-bl-none bg-indigo-700 text-white">
        <p className="break-words">{messageText}</p>
      </div>
      <p className="text-xs text-gray-500 mt-1 text-left">{sentAt}</p>
    </div>
  );
});

const GroupChatView = React.forwardRef((props, ref) => {
  const { item, isSender } = props;
  const date = item.sentAt ? item.sentAt.toDate().getTime() : Date.now();
  const sentAt = formatDistance(date, new Date(), { addSuffix: true });

  return (
    <>
      {isSender ? (
        <SenderMessage
          ref={ref}
          messageText={item.messageText}
          sentAt={sentAt}
        />
      ) : (
        <OtherMessage
          ref={ref}
          messageText={item.messageText}
          sentAt={sentAt}
        />
      )}
    </>
  );
});

export default GroupChatView;
