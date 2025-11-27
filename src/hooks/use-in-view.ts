import { useEffect, useState, RefObject } from "react";

export default function useInView<T extends Element>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const [inView, setInView] = useState(false);

  const { threshold = 0.15, root = null, rootMargin = "0px" } = options || {};

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Optionally unobserve after first reveal
          observer.unobserve(entry.target);
        }
      });
    }, { threshold, root: root as Element | null, rootMargin });

    observer.observe(node);

    return () => observer.disconnect();
    // include primitive options and ref (ref identity is stable)
  }, [ref, threshold, root, rootMargin]);

  return inView;
}
