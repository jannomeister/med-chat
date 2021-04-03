import React from "react";

const MemberGroupButton = ({ onLeaveGroup }) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center font-semibold border rounded-full px-6 py-1.5 text-black"
      onClick={onLeaveGroup}
    >
      Leave Group
    </button>
  );
};

export default MemberGroupButton;
