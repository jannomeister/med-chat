import React from "react";

const PreviewImages = ({ images, onRemove }) => {
  if (!images.length) {
    return null;
  }

  return (
    <div className="flex my-2">
      {images.map((image) => (
        <div
          key={image.url}
          className="relative w-14 h-14 mr-4 border border-gray-200 rounded"
        >
          <button
            className="absolute bg-gray-900 text-white font-semibold p-1 rounded-full"
            style={{ top: "-22%", right: "-20%" }}
            onClick={() => onRemove(image.url)}
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
          <img
            src={image.url}
            alt={image.url}
            className="w-full h-full rounded"
          />
        </div>
      ))}
    </div>
  );
};

export default PreviewImages;
