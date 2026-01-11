import React, { useState } from 'react';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1">
        <header
          className={`h-auto py-2 ${
            isSidebarOpen ? 'pl-[18%]' : 'pl-[5%]'
          } shadow-md pr-7 bg-[#fff] border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between transition-all duration-300`}
        >
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            Toggle Sidebar
          </button>
          <div>Header Content</div>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
