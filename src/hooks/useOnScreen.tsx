import type { RefObject } from "react";
import { useState, useEffect } from "react";

const useOnScreen = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  rootMargin = "0px"
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const element = ref?.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount
  return { isIntersecting };
};

export default useOnScreen;
