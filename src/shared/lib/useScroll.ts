import { useEffect } from "react";

export const useScroll = () => {
  useEffect(() => {
    const root = document.documentElement || document.body;
    root.scrollTop = 0;
  }, []);
};
