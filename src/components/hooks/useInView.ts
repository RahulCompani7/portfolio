  import { useState, useEffect, MutableRefObject } from "react";

  interface IntersectionObserverArgs {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
  }

  const useInView = (
    options: IntersectionObserverArgs
  ): [(node: HTMLDivElement | null) => void, boolean] => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => setIsInView(entry.isIntersecting),
          options
        );

        observer.observe(ref);

        return () => {
          observer.unobserve(ref);
        };
      }
    }, [ref, options]);

    return [setRef, isInView];
  };

  export default useInView;
