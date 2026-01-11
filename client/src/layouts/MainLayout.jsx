import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"; // centralized Navbar import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const isZoomed = windowWidth <= 1200;

  return (
    <>
      <div className="flex h-screen">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 transition-all duration-300 overflow-y-auto">
          <Navbar
            isOpen={isOpen}
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
          />

          <main
            className={`p-4 mt-14 mb-10 ${
              isZoomed || isMobile
                ? isOpen
                  ? "ml-0"
                  : "ml-20"
                : isOpen
                ? "ml-[18rem] transition-all duration-300"
                : "ml-20 transition-all duration-300"
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default MainLayout;
