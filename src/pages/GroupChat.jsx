import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../services/firebase";
import { addMessage, fetchGroup } from "../helpers/db";
import { currUser } from "../helpers/auth";

// components
import GroupChatLeftSidebar from "../components/GroupChatLeftSidebar";
import GroupChatRightSidebar from "../components/GroupChatRightSidebar";
import GroupChatView from "../components/GroupChatView";
import MessageInputBox from "../components/MessageInputBox";

const GroupChat = (props) => {
  const { id } = useParams();
  const messageBoxRef = useRef(null);
  const [group, setGroup] = useState(null);
  const [message, setMessage] = useState("");
  const [value, loading, error] = useCollection(
    db.collection("message").doc(id).collection("messages").orderBy("sentAt"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    fetchGroup(id).then((data) => {
      setGroup(data);
    });
  }, []);

  useEffect(() => {
    if (messageBoxRef && value) {
      messageBoxRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [value]);

  const onSend = async () => {
    setMessage("");

    await addMessage(id, message);
  };

  return (
    <div className="flex items-center justify-center">
      <GroupChatLeftSidebar />
      <div
        className="flex flex-col bg-white mb-20 overflow-y-auto no-scrollbar"
        style={{ width: "50%", height: "92vh" }}
      >
        {!loading && value.docs ? (
          value.docs.map((doc) => (
            <GroupChatView
              key={doc.id}
              item={doc.data()}
              isSender={doc.data().sentBy === currUser().uid}
              ref={messageBoxRef}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
        <MessageInputBox
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={
            group && group.members.includes(currUser().uid) ? true : false
          }
          onSend={onSend}
        />
      </div>
      <GroupChatRightSidebar
        owner={group?.createdBy}
        members={group?.members}
      />
    </div>
  );
};

export default GroupChat;
