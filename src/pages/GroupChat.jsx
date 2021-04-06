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

  const userNotAllowed =
    group && group.members.find((e) => e.uid === currUser().uid) ? false : true;

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
    if (userNotAllowed) {
      return window.alert("Oops! you didn't join this group chat");
    }

    if (!message) {
      return window.alert("Please type something!");
    }

    setMessage("");
    await addMessage(id, message);
  };

  const onSendGif = async (gifUrl) => {
    await addMessage(id, message, gifUrl);
  };

  return (
    <div className="flex items-center justify-center max-w-max my-0 mx-auto">
      <GroupChatLeftSidebar />
      <div
        className="relative overflow-scroll w-"
        style={{ width: "50rem", height: "100vh" }}
      >
        <div
          className="flex flex-col no-scrollbar overflow-scroll"
          style={{ maxHeight: "95%" }}
        >
          {!loading && value.docs ? (
            value.docs.map((doc) => (
              <GroupChatView
                key={doc.id}
                item={doc.data()}
                isSender={doc.data().sentBy.uid === currUser().uid}
                ref={messageBoxRef}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <MessageInputBox
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={
            group && group.members.find((e) => e.uid === currUser().uid)
              ? false
              : true
          }
          onSend={onSend}
          onSelectedEmoji={(emoji) => setMessage(message + emoji)}
          onSelectedGif={onSendGif}
        />
      </div>
      <GroupChatRightSidebar group={group} />
    </div>
  );
};

export default GroupChat;
