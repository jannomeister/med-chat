import "emoji-mart/css/emoji-mart.css";
import React from "react";
import Textarea from "react-textarea-autosize";

const MessageInput = ({ value, onChange, onEnter, disabled }) => {
  const onKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <Textarea
      placeholder="Type your message..."
      name="message"
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      disabled={disabled}
      className="w-full resize-none outline-none"
    />
  );
};

export default MessageInput;
