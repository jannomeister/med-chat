import * as React from "react";
import { useRef, useEffect, Children } from "react";
import Bricks from "bricks.js";

const MasonryLayout = ({ children, sizes }) => {
  const container = useRef(null);

  useEffect(() => {
    const bricks = Bricks({
      container: container.current,
      packed: "data-packed",
      sizes,
      position: true,
    });

    bricks.resize(true);

    if (Children.count(children) > 0) {
      bricks.pack();
    }
  }, [children]);

  return (
    <div ref={container} data-testid="MasonryLayoutContainer">
      {children}
    </div>
  );
};

export default MasonryLayout;
