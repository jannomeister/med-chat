import React from "react";
import { ImTwitter } from "react-icons/im";

const TwitterSigninButton = ({ onClick }) => {
  const COLOR = "#00aced";

  return (
    <div
      style={{ background: COLOR }}
      className="flex items-center cursor-pointer text-base font-medium px-5 py-4 rounded-full"
      onClick={onClick}
    >
      <div style={{ color: COLOR }} className="p-1 bg-white rounded-md">
        <ImTwitter />
      </div>
      <span className="text-white text-center w-full">
        Sign in with Twitter
      </span>
    </div>
  );
};

export default TwitterSigninButton;
