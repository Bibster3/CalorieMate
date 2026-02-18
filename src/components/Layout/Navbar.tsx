import React from "react";

const sections = ["hero", "info", "meals", "activity", "dashboard"] as const;
export type SectionKey = (typeof sections)[number];

type NavbarProps = {
  onNavigate: (section: SectionKey) => void;
};

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => (
  <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50 flex justify-center space-x-6 py-3">
    {[
      ["Home", "hero"],
      ["My Info", "info"],
      ["Meals", "meals"],
      ["Activity", "activity"],
      ["Dashboard", "dashboard"],
    ].map(([label, key]) => (
      <button
        key={key}
        onClick={() => onNavigate(key as SectionKey)}
        className="text-sm font-medium hover:text-blue-600 transition"
      >
        {label}
      </button>
    ))}
  </nav>
);

export default Navbar;
