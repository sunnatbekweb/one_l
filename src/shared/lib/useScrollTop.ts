import { useEffect } from "react";

export const useScroll = (x: number = 0, y: number = 0) => {
  useEffect(() => {
    window.scrollTo(x, y);
  }, [x, y]);
};
