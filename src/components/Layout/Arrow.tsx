import React from "react";

export const Arrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Scroll to next section"
    className="
      absolute
      right-4
      top-1/2
      transform -translate-y-1/2
      text-[4rem]
      opacity-75 hover:opacity-100
      animate-bounce duration-1000 ease-in-out
      focus:outline-none
    "
  >
    →
  </button>
);