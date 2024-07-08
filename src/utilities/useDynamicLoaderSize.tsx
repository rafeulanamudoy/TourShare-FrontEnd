import { useState, useLayoutEffect, RefObject } from "react";

const useDynamicLoaderSize = (
  buttonRef: RefObject<HTMLButtonElement>,
  factor = 0.5
) => {
  const [loaderSize, setLoaderSize] = useState(15);

  useLayoutEffect(() => {
    if (buttonRef.current) {
      const buttonHeight = buttonRef.current.clientHeight;
      setLoaderSize(buttonHeight * factor);
    }
  }, [buttonRef, factor]);

  return loaderSize;
};

export default useDynamicLoaderSize;
