import React from "react";

const MemberAvatar = ({ src, alt = "", height, width, ...rest }) => {
  const containerStyles = {
    width: width,
    height: height,
    borderRadius: "100%",
    border: "4px solid white",
    background: "black",
  };

  const imgStyles = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
  };

  return (
    <div style={containerStyles} {...rest}>
      <img src={src} alt={alt} style={imgStyles} />
    </div>
  );
};

export default MemberAvatar;
