import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import { db, storage } from "../services/firebase";
import { addMessage, fetchGroup } from "../helpers/db";
import { currUser } from "../helpers/auth";

// components
import {
  MessageBoxWrapper,
  MessageInput,
  MessageGifButton,
  MessageEmojiButton,
  MessageImageButton,
  MessageFileButton,
  MessageFileIndicator,
  MessageWrapper,
  MessageList,
  MessageSendButton,
  FileUploadIndicator,
} from "./MessageBox";

const MessageItem = () => {
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

    if (!message && !fileUrl) return;

    setMessage("");
    setFileUrl("");
    await addMessage(id, message, { fileUrl });
  };

  const onSendGif = async (gifUrl) => {
    setOpenGif(!openGif);
    await addMessage(id, message, { gifUrl });
  };

  return (
    <MessageWrapper>
      {!loading ? (
        <MessageList messages={value.docs} itemRef={messageBoxRef} />
      ) : (
        <p>Loading...</p>
      )}

      {isUploading ? <FileUploadIndicator progress={uploadProgress} /> : null}

      <MessageBoxWrapper>
        <div className="px-2 pt-2">
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onEnter={onSend}
            disabled={false}
          />
        </div>

        <div className="mt-1 flex flex-col items-end border-t px-2 py-1">
          <div className="flex">
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
            <MessageImageButton
              name="image"
              storageRef={storage.ref(`group/${id}/images`)}
              onUploadStart={() => {
                setIsUploading(true);
                setUploadProgress(0);
              }}
              onUploadError={(error) => {
                setIsUploading(false);
              }}
              onUploadProgress={(progress) => {
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
            <div className="mx-1" />
            <MessageFileButton
              name="file"
              storageRef={storage.ref(`group/${id}/files`)}
              onUploadStart={() => {
                setIsUploading(true);
                setUploadProgress(0);
              }}
              onUploadError={(error) => {
                setIsUploading(false);
              }}
              onUploadProgress={(progress) => {
                setUploadProgress(progress);
              }}
              onUploadSuccess={async (filename) => {
                setIsUploading(false);
                setUploadProgress(100);

                const url = await storage
                  .ref(`group/${id}/files`)
                  .child(filename)
                  .getDownloadURL();

                setFileUrl(url);
              }}
            />
            <div className="mx-1" />
            <MessageSendButton onSend={onSend} disabled={!message} />
          </div>
        </div>
      </MessageBoxWrapper>
    </MessageWrapper>
  );
};

export default MessageItem;
