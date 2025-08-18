import { useEffect } from "react";

export const useScrollTop = () => {
  useEffect(() => {
    const root = document.documentElement || document.body;
    root.scrollTop = 0;
  }, []);
};
