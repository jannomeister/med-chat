import React from "react";
import { useStyle } from "../../style";
import { styles } from "./alertStyles";

const Alert = ({ show, message }) => {
  useStyle("Alert", styles);

  return (
    show && (
      <p
        role="alert"
        data-testid="Alert"
        className="reactGiphySearchbox-message"
      >
        {message}
      </p>
    )
  );
};

export default Alert;
