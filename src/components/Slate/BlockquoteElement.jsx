import React from "react";

const BlockquoteElement = (props) => {
  return (
    <blockquote
      {...props.attributes}
      className="pl-4 py-1 italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote"
    >
      {props.children}
    </blockquote>
  );
};

export default BlockquoteElement;
