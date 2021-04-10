import React from "react";
import FileUploader from "react-firebase-file-uploader";
// import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";

const MessageImageButton = React.forwardRef((props, ref) => {
  return (
    <label className="text-gray-500 w-6 cursor-pointer flex items-center">
      <FileUploader
        accept="image/*"
        name={props.name}
        hidden
        randomizeFilename
        storageRef={props.storageRef}
        onUploadStart={props.onUploadStart}
        onUploadError={props.onUploadError}
        onUploadSuccess={props.onUploadSuccess}
        onProgress={props.onUploadProgress}
        ref={ref}
        onChange={props.onChange}
        multiple
      />
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
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </label>
  );
});

export default MessageImageButton;
