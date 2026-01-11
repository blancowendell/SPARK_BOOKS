import React from "react";
import { useAuth } from "../../api/public/auth/parts/authContext";
import AdminNavbar from "./parts/AdminNavbar";
import CustomerNavbar from "./parts/CustomerNavbar";

const NavbarIndex = ({ isOpen, isMobile, toggleSidebar }) => {
  const { session } = useAuth();

  if (!session) {
    return <div>Loading...</div>;
  }

  const NavbarComponent =
    session.access_type === "Customer" ? CustomerNavbar : AdminNavbar;

  return (
    <NavbarComponent
      isOpen={isOpen}
      isMobile={isMobile}
      toggleSidebar={toggleSidebar}
    />
  );
};

export default NavbarIndex;
