import React from "react";

const navItems = [
  { label: "Home", section: "hero" },
  { label: "My Info", section: "info" },
  { label: "Meals", section: "meals" },
  { label: "Activity", section: "activity" },
  { label: "Dashboard", section: "dashboard" },
] as const;

export type SectionKey = (typeof navItems)[number]["section"];

type NavbarProps = {
  onNavigate: (section: SectionKey) => void;
};

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center space-x-6 bg-white py-3 shadow">
    {navItems.map((item) => (
      <button
        key={item.section}
        onClick={() => onNavigate(item.section)}
        className="text-sm font-medium transition hover:text-blue-600"
      >
        {item.label}
      </button>
    ))}
  </nav>
);

export default Navbar;
