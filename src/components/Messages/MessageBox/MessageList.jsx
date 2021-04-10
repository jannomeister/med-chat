import React from "react";
import { currUser } from "../../../helpers/auth";

// components
import MessageListItem from "./MessageListItem";

const MessageList = ({ loading, messages, itemRef }) => {
  const currUserId = currUser().uid;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="flex flex-col-reverse relative no-scrollbar overflow-scroll"
      style={{ height: "90%" }}
    >
      {messages.map((doc, index) => (
        <MessageListItem
          key={`${index}-${doc.id}`}
          message={doc.data()}
          isOwner={doc.data().sentBy.uid === currUserId}
          ref={itemRef}
        />
      ))}
    </div>
  );
};

export default MessageList;
