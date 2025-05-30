import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="justify-between flex flex-col min-h-screen">
      <div className="pl-4 py-4 flex-grow flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;