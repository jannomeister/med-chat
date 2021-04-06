import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import { db, storage } from "../services/firebase";
import { addMessage, fetchGroup } from "../helpers/db";
import { currUser } from "../helpers/auth";

// components
import GroupChatLeftSidebar from "../components/GroupChatLeftSidebar";
import GroupChatRightSidebar from "../components/GroupChatRightSidebar";
import GroupChatView from "../components/GroupChatView";
import {
  MessageBoxWrapper,
  MessageInput,
  MessageGifButton,
  MessageEmojiButton,
  MessageFileButton,
  MessageFileIndicator,
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

        {isUploading ? (
          <div className="absolute bottom-16 w-full p-2">
            <div className="bg-white border border-gray-300 rounded-lg p-2">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                      Uploading
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-pink-600">
                      {uploadProgress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                  <div
                    style={{ width: `${uploadProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

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
      </div>
      <GroupChatRightSidebar group={group} />
    </div>
  );
};

export default GroupChat;
