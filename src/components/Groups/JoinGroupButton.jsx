import React from "react";

const JoinGroupButton = ({ onJoinGroup }) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center font-semibold bg-red-500 border rounded-full px-6 py-1.5 text-white"
      onClick={onJoinGroup}
    >
      Join the Group Chat
    </button>
  );
};

export default JoinGroupButton;
