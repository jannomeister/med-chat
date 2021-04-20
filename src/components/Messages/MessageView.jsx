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
  MessageFileButton,
  MessageWrapper,
  MessageList,
  MessageGroupInfo,
  MessageInfo,
  MessageSendButton,
  FileUploadIndicator,
  PreviewFiles,
} from "./MessageBox";
// import TextEditor from "../Slate/TextEditor";

// mocks
// import { messagesMock } from "../../__mocks__";

const MessageView = () => {
  const { id } = useParams();
  const messageBoxRef = useRef(null);
  const imageUploadButtonRef = useRef(null);
  const [group, setGroup] = useState(null);
  const [message, setMessage] = useState("");
  const [filesUrl, setFilesUrl] = useState([]);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [openGif, setOpenGif] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // const value = { docs: messagesMock };
  // const loading = false;
  const [value, loading] = useCollection(
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
    console.log("fillladssda: ", filename);
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
        <MessageGroupInfo group={group} />

        <MessageList
          loading={loading}
          messages={value?.docs}
          itemRef={messageBoxRef}
        />

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
      <MessageInfo
        totalMembers={group ? group.members.length : 0}
        totalImages={group ? group.totalImages : 0}
        totalFiles={group ? group.totalFiles : 0}
        totalMessages={value ? value.docs.length : 0}
      />
    </>
  );
};

export default MessageView;
