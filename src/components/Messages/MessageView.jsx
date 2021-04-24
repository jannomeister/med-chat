import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import { db, storage } from "../../services/firebase";
import { addMessage, fetchGroup } from "../../helpers/db";
import { currUser } from "../../helpers/auth";
import { useMessages, useGroup } from "../../hooks";

// components
import {
  MessageBoxWrapper,
  MessageInput,
  MessageGifButton,
  MessageEmojiButton,
  MessageFileButton,
  MessageWrapper,
  MessageList,
  MessageGroupInfo,
  MessageInfo,
  MessageSendButton,
  FileUploadIndicator,
  PreviewFiles,
} from "./MessageBox";

// mocks
// import { messagesMock } from "../../__mocks__";

const MessageView = () => {
  const { id } = useParams();
  const messageBoxRef = useRef(null);
  const imageUploadButtonRef = useRef(null);
  const [message, setMessage] = useState("");
  const [filesUrl, setFilesUrl] = useState([]);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [openGif, setOpenGif] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [group, isFetchingGroup] = useGroup(id);

  const userNotAllowed = false; // group && group.members.find((uid) => uid === currUser().uid) ? false : true;

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    if (rerender) return;

    if (!isUploading && filesUrl.length > previewFiles.length) {
      setMessage("");
      setFilesUrl([]);
      setPreviewFiles([]);
      setUploadProgress(0);
      setRerender(true);

      async function addMessageSync() {
        await addMessage(id, message, { fileUrls: filesUrl });
      }

      addMessageSync();
    }
  }, [id, message, isUploading, filesUrl, previewFiles, rerender]);

  const onSelectedFilesOrImages = (e) => {
    setShowFilePreview(true);

    const tempPreview = [...previewFiles];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const url = URL.createObjectURL(file);
      const existed = tempPreview.find((e) => e.file.name === file.name);

      if (!existed) {
        tempPreview.push({ file, url });
      }
    }

    setPreviewFiles(tempPreview);
  };

  const onImageUploadSuccess = async (filename) => {
    const childRef = storage.ref(`group/${id}/files`).child(filename);
    const url = await childRef.getDownloadURL();
    const metaData = await childRef.getMetadata();

    const realfilename = filename.split("_").slice(1).join("_");

    setFilesUrl((oldValue) => [
      ...oldValue,
      { url, filename: realfilename, contentType: metaData.contentType },
    ]);
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
    <>
      <MessageWrapper>
        <MessageList groupId={id} itemRef={messageBoxRef} />

        {isUploading ? (
          <FileUploadIndicator
            label={`Uploading ${previewFiles.length} files...`}
            progress={uploadProgress}
          />
        ) : null}

        <MessageBoxWrapper>
          <div className="px-2 pt-2">
            {showFilePreview ? (
              <PreviewFiles
                files={previewFiles}
                onRemove={(url) => {
                  const filtered = previewFiles.filter((pf) => pf.url !== url);

                  setPreviewFiles(filtered);
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
                onOutsideClick={() => setOpenGif(false)}
                onSelect={onSendGif}
              />
              <div className="mx-1" />
              <MessageEmojiButton
                open={openEmoji}
                onClick={() => setOpenEmoji(!openEmoji)}
                onOutsideClick={() => setOpenEmoji(false)}
                onSelect={(emoji) => {
                  setMessage(message + emoji);
                  setOpenEmoji(!openEmoji);
                }}
              />
              <div className="mx-1" />
              <MessageFileButton
                name="file"
                ref={imageUploadButtonRef}
                storageRef={storage.ref(`group/${id}/files`)}
                onChange={onSelectedFilesOrImages}
                onUploadStart={() =>
                  setIsUploading(true) && setUploadProgress(0)
                }
                onUploadError={(error) => setIsUploading(false)}
                onUploadProgress={(progress) => setUploadProgress(progress)}
                onUploadSuccess={onImageUploadSuccess}
              />
              <div className="mx-1" />
              <MessageSendButton onSend={onSend} disabled={!message} />
            </div>
          </div>
        </MessageBoxWrapper>
      </MessageWrapper>

      {group ? <MessageGroupInfo group={group} /> : null}
      {/* <MessageInfo
        totalMembers={group ? group.members.length : 0}
        totalImages={group ? group.totalImages : 0}
        totalFiles={group ? group.totalFiles : 0}
        totalMessages={messages ? messages.length : 0}
      /> */}
    </>
  );
};

export default MessageView;
