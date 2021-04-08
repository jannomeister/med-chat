import React from "react";

const DefaultElement = (props) => {
  return <div {...props.attributes}>{props.children}</div>;
};

export default DefaultElement;
