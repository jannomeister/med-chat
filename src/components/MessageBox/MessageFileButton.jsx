import React, { useRef } from "react";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";

const MessageFileButton = (props) => {
  const inputRef = useRef(null);

  return (
    <CustomUploadButton
      accept={props.accept ? props.accept : "image/*"}
      name={props.name}
      randomizeFilename
      storageRef={props.storageRef}
      onUploadStart={props.onUploadStart}
      onUploadError={props.onUploadError}
      onUploadSuccess={props.onUploadSuccess}
      onProgress={props.onUploadProgress}
      className="text-gray-500 w-6 cursor-pointer flex items-center"
    >
      <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
        />
      </svg>
    </CustomUploadButton>
  );
};

export default MessageFileButton;
