import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { currUser } from "../../../helpers/auth";
import { db } from "../../../services/firebase";

// components
import MessageListItem from "./MessageListItem";

const MessageList = ({ groupId, itemRef }) => {
  const currUserId = currUser().uid;
  const [value, loading] = useCollection(
    db
      .collection("messages")
      .doc(groupId)
      .collection("messages")
      .orderBy("sentAt", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col-reverse relative no-scrollbar overflow-scroll"
      style={{ height: "89vh" }}
    >
      {value?.docs.map((doc, index) => (
        <MessageListItem
          key={`${index}-${doc.id}`}
          message={doc.data()}
          isOwner={doc.data().sentBy === currUserId}
          ref={itemRef}
        />
      ))}
    </div>
  );
};

export default MessageList;
