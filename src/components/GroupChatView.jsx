import React from "react";
import { formatDistance, format } from "date-fns";

const SenderMessage = React.forwardRef(
  ({ owner, messageText, files, gif, sentAt }, ref) => {
    return (
      <div
        className="flex flex-col mx-4 mt-2 mb-2 p-2 w-3/4 self-end"
        ref={ref}
      >
        <h1 className="text-xs text-gray-500 mb-1 text-right">You, {sentAt}</h1>
        {messageText && !gif ? (
          <div className="border border-gray-200 p-4 text-sm rounded-lg rounded-br-none bg-gray-200 self-end">
            <p className="break-words">{messageText}</p>

            {files.length > 0 ? (
              <div className="mt-2">
                <img src={files[0]} alt="" />
              </div>
            ) : null}
          </div>
        ) : (
          <img src={gif} alt="asdasd" />
        )}
      </div>
    );
  }
);

const OtherMessage = React.forwardRef(
  ({ owner, messageText, files, gif, sentAt }, ref) => {
    const name = owner.displayName ? owner.displayName : owner.email;

    return (
      <div
        className="flex flex-row mx-4 mt-2 mb-2 p-2 w-3/4 self-start"
        ref={ref}
      >
        <div className="flex flex-col justify-end">
          <img
            src={owner.photoURL}
            width={30}
            height={30}
            alt=""
            className="rounded-full mr-2 bg-black"
          />
        </div>
        <div>
          <h1 className="text-xs text-gray-500 mb-1">
            {name}, {sentAt}
          </h1>
          {messageText && !gif ? (
            <div className="border border-gray-200 p-2 text-sm rounded-lg rounded-bl-none bg-indigo-700 text-white self-start">
              <p className="break-words">{messageText}</p>

              {files.length > 0 ? (
                <div className="mt-2">
                  <img src={files[0]} alt="" />
                </div>
              ) : null}
            </div>
          ) : (
            <img src={gif} alt="asdasd" />
          )}
        </div>
      </div>
    );
  }
);

const GroupChatView = React.forwardRef((props, ref) => {
  const { item, isSender } = props;
  const date = item.sentAt ? item.sentAt.toDate().getTime() : Date.now();
  const sentAt = formatDistance(date, new Date(), { addSuffix: true });
  const sentAtTime = format(date, "hh:mm aa");

  return (
    <>
      {isSender ? (
        <SenderMessage
          ref={ref}
          messageText={item.messageText}
          files={item.hasFile ? item.files : []}
          gif={item.hasGif ? item.gif : ""}
          sentAt={sentAtTime}
        />
      ) : (
        <OtherMessage
          ref={ref}
          owner={item.sentBy}
          messageText={item.messageText}
          files={item.hasFile ? item.files : []}
          gif={item.hasGif ? item.gif : ""}
          sentAt={sentAtTime}
        />
      )}
    </>
  );
});

export default GroupChatView;
