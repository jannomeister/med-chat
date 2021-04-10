import React from "react";

const MessageGroupInfo = ({ group }) => {
  return (
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
  );
};

export default MessageGroupInfo;
