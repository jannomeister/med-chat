import React from "react";

const BulletedListElement = (props) => {
  return (
    <ul {...props.attributes} className="list-disc list-inside">
      <li>{props.children}</li>
    </ul>
  );
};

export default BulletedListElement;
