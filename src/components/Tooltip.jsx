import React, { createRef } from "react";

const Tooltip = ({ children, tooltipText }) => {
  const tipRef = createRef(null);

  const onMouseEnter = () => {
    tipRef.current.style.opacity = 1;
    tipRef.current.style.marginLeft = "20px";
  };

  const onMouseLeave = () => {
    tipRef.current.style.opacity = 0;
    tipRef.current.style.marginLeft = "10px";
  };

  return (
    <div
      className="relative flex items-center z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="absolute whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded flex items-center transition-all duration-150"
        style={{ left: "100%", opacity: 0 }}
        ref={tipRef}
      >
        <div
          className="bg-black h-3 w-3 absolute"
          style={{ left: "-6px", transform: "rotate(45deg)" }}
        />
        {tooltipText}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
