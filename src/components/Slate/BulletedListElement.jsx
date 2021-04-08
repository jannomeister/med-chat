import React from "react";

const BulletedList = (props) => {
  console.log("hello");
  return (
    <ul {...props.attributes} className="bg-red-500">
      {props.children}
    </ul>
  );
};

export default BulletedList;
