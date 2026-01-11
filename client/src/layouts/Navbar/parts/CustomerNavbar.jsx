import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../api/public/auth/parts/authContext";

const CustomerNavbar = ({ isOpen, isMobile, toggleSidebar }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/customerlogin", { replace: true }); // ✅ FIXED LINE
  };

  return (
    <div
      className={`fixed top-0 right-0 z-30 py-3 px-4 bg-white border-b border-[rgba(0,0,0,0.1)] shadow-md
        ${isMobile || windowWidth <= 1200
          ? isOpen
            ? "w-full ml-0"
            : "w-[calc(100%-5rem)] ml-20"
          : isOpen
          ? "w-[calc(100%-19rem)] ml-[19rem] rounded-lg m-2 transition-all duration-300 ease-in-out"
          : "w-[calc(100%-6rem)] ml-20 rounded-lg m-2 transition-all duration-300 ease-in-out"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-4">
          <button
            onClick={toggleSidebar}
            className="text-[var(--main-color)] px-4 md:py-0 py-2 font-extrabold hover:rounded-lg"
          >
            ☰
          </button>
          Customer
        </div>

        <div className="relative" ref={dropdownRef}>
          <div className="flex flex-row gap-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="rounded-full focus:outline-none"
            >
              <FaUserCircle size={32} className="text-gray-600" />
            </button>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border">
              <div className="px-4 py-2 text-sm text-gray-700 border-b font-medium flex items-center gap-2">
                <FaUserCircle />
                {session?.fullname || "Loading..."}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerNavbar;
