import React from "react";

const DefaultElement = (props) => {
  return (
    <div {...props.attributes} style={{ userSelect: "none" }}>
      {props.children}
    </div>
  );
};
export default DefaultElement;
