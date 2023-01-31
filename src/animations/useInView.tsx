import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { useSelector } from "../store/store";
import { getThemeState } from "../store/slices/theme-slice";

export default function UseInView({ children }: {children:React.ReactNode}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const { hoveredCategory } = useSelector(getThemeState);
  const opacityCheck = () : string => {
   return hoveredCategory.homePageHoveredImgPath.includes("banner") ? "#0077ff" : "#0077ff5e"
  }
const checkedSectionBackground : string = opacityCheck()
  return (
    <section ref={ref} style={{background:checkedSectionBackground}}>
      <span
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          
        }}
      >
        {children}
      </span>
    </section>
  );
}