import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "./menuItems";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50 flex justify-between items-center px-6 py-3">
      <Link to="/" className="flex items-center space-x-2">
        <img src="src/assets/favicon16.svg" alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-blue-600">Calorie Mate</span>
      </Link>
      <div className="space-x-6 text-sm font-medium">
        {Routes.map((item) => (
          <Link
            key={item.slug}
            to={item.slug}
            className="hover:text-blue-500"
            data-testid={`${item.name.toLowerCase()}-link`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;