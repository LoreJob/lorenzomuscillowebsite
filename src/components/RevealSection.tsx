import React, { ReactNode, useRef } from "react";
import useInView from "@/hooks/use-in-view";

type Props = {
  children: ReactNode;
  className?: string;
  threshold?: number;
};

const RevealSection: React.FC<Props> = ({ children, className = "", threshold = 0.15 }) => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { threshold });

  return (
    <section ref={ref} className={`reveal ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </section>
  );
};

export default RevealSection;
