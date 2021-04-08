import React from "react";

const OrderedListElement = (props) => {
  return (
    <ol {...props.attributes} className="list-decimal list-inside">
      <li>{props.children}</li>
    </ol>
  );
};

export default OrderedListElement;
