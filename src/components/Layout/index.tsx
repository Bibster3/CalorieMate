import { Link } from "react-router-dom";
import { Routes } from "./menuItems";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="justify-between flex flex-col min-h-screen">
      
      <div className="pl-4 py-4 flex-grow flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
