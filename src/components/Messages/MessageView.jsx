import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import { db, storage } from "../../services/firebase";
import { addMessage, fetchGroup } from "../../helpers/db";
import { currUser } from "../../helpers/auth";

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
  PreviewImages,
} from "./MessageBox";

const MessageView = () => {
  const { id } = useParams();
  const messageBoxRef = useRef(null);
  const imageUploadButtonRef = useRef(null);
  const [group, setGroup] = useState(null);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState([]);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [openGif, setOpenGif] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [value, loading, error] = useCollection(
    db
      .collection("message")
      .doc(id)
      .collection("messages")
      .orderBy("sentAt", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const userNotAllowed =
    group && group.members.find((e) => e.uid === currUser().uid) ? false : true;

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    fetchGroup(id).then((data) => {
      setGroup(data);
    });
  }, [id]);

  useEffect(async () => {
    if (rerender) return;

    if (!isUploading && fileUrl.length > previewFiles.length) {
      setMessage("");
      setFileUrl([]);
      setPreviewFiles([]);
      setRerender(true);
      await addMessage(id, message, { fileUrls: fileUrl });
    }
  }, [isUploading, fileUrl, previewFiles, rerender]);

  const onSelectedImages = (e) => {
    setShowFilePreview(true);

    const tempPreview = [];

    for (const file of e.target.files) {
      tempPreview.push({
        file,
        url: URL.createObjectURL(file),
      });
    }

    setPreviewFiles(tempPreview);
  };

  const onImageUploadSuccess = async (filename) => {
    const url = await storage
      .ref(`group/${id}/images`)
      .child(filename)
      .getDownloadURL();

    setFileUrl((oldValue) => [...oldValue, url]);
    setPreviewFiles(previewFiles.slice(1));

    setUploadProgress(100);
    setIsUploading(false);
  };

  const onSend = async () => {
    if (userNotAllowed) {
      return window.alert("Oops! you didn't join this group chat");
    }

    if (!message && !previewFiles.length) return;

    setRerender(false);

    if (previewFiles.length > 0) {
      setShowFilePreview(false);
      previewFiles.forEach((pf) => {
        imageUploadButtonRef.current.startUpload(pf.file);
      });
    } else {
      setMessage("");
      await addMessage(id, message);
    }
  };

  const onSendGif = async (gifUrl) => {
    setOpenGif(!openGif);
    await addMessage(id, message, { gifUrl });
  };

  return (
    <MessageWrapper>
      <div className="absolute w-full z-50 bg-white px-2 py-1">
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg my-1 px-4 py-3 shadow-md">
          <img
            src={group?.avatar}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/fallback_img.webp";
            }}
            className="w-7 h-7 bg-black rounded-full border-none"
          />
          <div>
            <h1 className="text-base font-semibold">{group?.name}</h1>
            <p className="text-xs text-gray-400">{group?.description}</p>
          </div>
        </div>
      </div>

      {!loading ? (
        <MessageList messages={value.docs} itemRef={messageBoxRef} />
      ) : (
        <p>Loading...</p>
      )}

      {isUploading ? (
        <FileUploadIndicator
          label={`Uploading ${previewFiles.length} files...`}
          progress={uploadProgress}
        />
      ) : null}

      <MessageBoxWrapper>
        <div className="px-2 pt-2">
          {showFilePreview ? (
            <PreviewImages
              images={previewFiles}
              onRemove={(url) => {
                const filteredFiles = previewFiles.filter(
                  (pf) => pf.url !== url
                );

                setPreviewFiles(filteredFiles);
              }}
            />
          ) : null}

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
              ref={imageUploadButtonRef}
              storageRef={storage.ref(`group/${id}/images`)}
              onChange={onSelectedImages}
              onUploadStart={() => {
                setIsUploading(true);
                setUploadProgress(0);
              }}
              onUploadError={(error) => setIsUploading(false)}
              onUploadProgress={(progress) => setUploadProgress(progress)}
              onUploadSuccess={onImageUploadSuccess}
            />
            {/* <div className="mx-1" /> */}
            {/* <MessageFileButton
              name="file"
              storageRef={storage.ref(`group/${id}/files`)}
              onChange={(e) => console.log("files::: ", e.target)}
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
            /> */}
            <div className="mx-1" />
            <MessageSendButton onSend={onSend} disabled={!message} />
          </div>
        </div>
      </MessageBoxWrapper>
    </MessageWrapper>
  );
};

export default MessageView;
