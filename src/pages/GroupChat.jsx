import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import { db, storage } from "../services/firebase";
import { addMessage, fetchGroup } from "../helpers/db";
import { currUser } from "../helpers/auth";

// components
import GroupChatLeftSidebar from "../components/GroupChatLeftSidebar";
import GroupChatRightSidebar from "../components/GroupChatRightSidebar";
import {
  MessageBoxWrapper,
  MessageInput,
  MessageGifButton,
  MessageEmojiButton,
  MessageFileButton,
  MessageFileIndicator,
  MessageWrapper,
  MessageList,
  FileUploadIndicator,
} from "../components/MessageBox";

const GroupChat = (props) => {
  const { id } = useParams();
  const messageBoxRef = useRef(null);
  const [group, setGroup] = useState(null);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [openGif, setOpenGif] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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

    if (!message && !fileUrl) {
      return window.alert("Please type something!");
    }

    setMessage("");
    setFileUrl("");
    await addMessage(id, message, { fileUrl });
  };

  const onSendGif = async (gifUrl) => {
    setOpenGif(!openGif);
    await addMessage(id, message, { gifUrl });
  };

  return (
    <div className="flex items-center justify-center max-w-max my-0 mx-auto">
      <GroupChatLeftSidebar />
      <MessageWrapper>
        {!loading ? (
          <MessageList messages={value.docs} itemRef={messageBoxRef} />
        ) : (
          <p>Loading...</p>
        )}

        {isUploading ? <FileUploadIndicator progress={uploadProgress} /> : null}

        <MessageBoxWrapper onSend={onSend}>
          <MessageFileIndicator show={fileUrl ? true : false} />
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onEnter={onSend}
            disabled={userNotAllowed}
          />
          <div className="mx-1" />
          <MessageGifButton
            open={openGif}
            onClick={() => setOpenGif(!openGif)}
            onSelect={onSendGif}
          />
          <div className="mx-1" />
          <MessageEmojiButton
            open={openEmoji}
            onClick={() => setOpenEmoji(!openEmoji)}
            onSelect={(emoji) => {
              setMessage(message + emoji);
              setOpenEmoji(!openEmoji);
            }}
          />
          <div className="mx-1" />
          <MessageFileButton
            name="file"
            storageRef={storage.ref(`group/${id}/images`)}
            onUploadStart={() => {
              setIsUploading(true);
              setUploadProgress(0);
            }}
            onUploadError={(error) => {
              setIsUploading(false);
              console.log("upload error: ", error);
            }}
            onUploadProgress={(progress) => {
              console.log("progresss: ", progress);
              setUploadProgress(progress);
            }}
            onUploadSuccess={async (filename) => {
              setIsUploading(false);
              setUploadProgress(100);

              const url = await storage
                .ref(`group/${id}/images`)
                .child(filename)
                .getDownloadURL();

              setFileUrl(url);
            }}
          />
        </MessageBoxWrapper>
      </MessageWrapper>
      <GroupChatRightSidebar id={id} group={group} />
    </div>
  );
};

export default GroupChat;
