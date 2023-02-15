import { useRef, useCallback } from "react";

const useFocus = () => {
  const htmlElRef = useRef<HTMLInputElement>(null);

  const setFocus = useCallback(() => {
    htmlElRef.current && htmlElRef.current.focus();
  }, []);

  return { htmlElRef, setFocus };
};

export default useFocus;
