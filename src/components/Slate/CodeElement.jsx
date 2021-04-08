import React from "react";

const CodeElement = (props) => {
  return (
    <pre {...props.attributes} className="bg-gray-100 p-1">
      <code>{props.children}</code>
    </pre>
  );
};

export default CodeElement;
