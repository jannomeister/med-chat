import React from "react";
import { useStyle } from "../../style";
import { styles } from "./poweredByGiphyStyles";
import PoweredByGiphyLogo from "../../assets/PoweredByGiphyLogo";

const PoweredByGiphy = ({ image }) => {
  useStyle("PoweredByGiphy", styles);

  return (
    <div className="reactGiphySearchbox-poweredByGiphy">
      {image ? (
        <img src={image} alt="Powered by Giphy" data-testid="PoweredByGiphy" />
      ) : (
        <PoweredByGiphyLogo />
      )}
    </div>
  );
};

export default PoweredByGiphy;
