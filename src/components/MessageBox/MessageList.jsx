import React from "react";
import { currUser } from "../../helpers/auth";

// components
import MessageListItem from "./MessageListItem";

const MessageList = ({ messages, itemRef }) => {
  const currUserId = currUser().uid;

  return (
    <div
      className="flex flex-col-reverse no-scrollbar overflow-scroll"
      style={{ height: "93vh" }}
    >
      {messages.map((doc, index) => (
        <MessageListItem
          key={`${index} ${doc.id}`}
          message={doc.data()}
          isOwner={doc.data().sentBy.uid === currUserId}
          ref={itemRef}
        />
      ))}
    </div>
  );
};

export default MessageList;
