import { useEffect } from "react";

export const useScrollAnimation = (className = "scroll-animation") => {
  useEffect(() => {
    const elements = document.querySelectorAll(`.${className}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [className]);
};
