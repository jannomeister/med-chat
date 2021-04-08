import React from "react";

// Define a React component to render leaves with bold text.
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.strikethrough ? "line-through" : "none",
      }}
    >
      {props.children}
    </span>
  );
};

export default Leaf;
