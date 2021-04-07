import React from "react";

// components
import GroupChatLeftSidebar from "../components/GroupChatLeftSidebar";
import {
  MessageBoxWrapper,
  MessageInput,
  MessageGifButton,
  MessageEmojiButton,
  MessageFileButton,
  MessageFileIndicator,
  MessageWrapper,
  MessageList,
  FileUploadIndicator,
} from "../components/MessageBox";

const Messages = () => {
  return (
    <div className="flex items-center justify-center max-w-max my-0">
      <GroupChatLeftSidebar />
      <MessageWrapper />
    </div>
  );
};

export default Messages;
