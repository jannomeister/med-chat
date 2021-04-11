import React from "react";
import { ImGoogle } from "react-icons/im";

const GoogleSigninButton = ({ onClick }) => {
  const COLOR = "#ea4335";

  return (
    <div
      style={{ background: COLOR }}
      className="flex items-center cursor-pointer text-base font-medium px-5 py-4 rounded-full"
      onClick={onClick}
    >
      <div style={{ color: COLOR }} className="p-1 bg-white rounded-md">
        <ImGoogle />
      </div>
      <span className="text-white text-center w-full">Sign in with Google</span>
    </div>
  );
};

export default GoogleSigninButton;
