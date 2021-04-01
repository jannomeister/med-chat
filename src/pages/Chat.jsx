import React, { useState } from "react";
import { logout } from "../helpers/auth";

const Chat = () => {
  const onLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1>Chat here...</h1>

      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Chat;
