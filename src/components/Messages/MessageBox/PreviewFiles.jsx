import React from "react";

const PreviewImage = ({ file, onClick }) => {
  return (
    <div
      key={file.url}
      className="relative h-14 mr-4 border border-gray-200 rounded"
    >
      <button
        className="absolute bg-gray-900 text-white font-semibold p-1 rounded-full"
        style={{ top: "-22%", right: "-20%" }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <img src={file.url} alt={file.url} className="w-14 h-full rounded" />
    </div>
  );
};

const PreviewFile = ({ file, onClick }) => {
  return (
    <div className="relative h-14 mr-4 p-1 border-none bg-gray-600 w-40 rounded">
      <button
        className="absolute bg-gray-900 text-white font-semibold p-1 rounded-full"
        style={{ top: "-20%", right: "-6%" }}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex items-center h-full">
        <div className="flex items-center justify-center mr-1 w-8 h-8 rounded-full min-w-max bg-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="w-3/4 overflow-hidden overflow-ellipsis text-white font-semibold">
          {file.file.name}
        </p>
      </div>
    </div>
  );
};

const PreviewFiles = ({ files, onRemove }) => {
  if (!files.length) {
    return null;
  }

  return (
    <div className="flex my-2">
      {files.map((file) => (
        <React.Fragment key={file.url}>
          {file.file.type.startsWith("image/") ? (
            <PreviewImage file={file} onClick={() => onRemove(file.url)} />
          ) : (
            <PreviewFile file={file} onClick={() => onRemove(file.url)} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PreviewFiles;
