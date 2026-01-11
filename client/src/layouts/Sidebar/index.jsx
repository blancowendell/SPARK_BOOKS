import { Menu } from "antd";
import { useState, useEffect } from "react";
import Logo from "../../assets/images/logo2.png";
import Brand from "../../assets/images/brand2.png";
import { AdminMenuConfig } from "../Sidebar/parts/AdminMenuConfig";
import { CustomerMenuConfig } from "../Sidebar/parts/CustomerMenuConfig";
import { transformMenuItems } from "../../utils/TransformMenu";
import { useAuth } from "../../api/public/auth/parts/authContext";

const Sidebar = ({ isOpen, isMobile }) => {
  const { session } = useAuth();
  const [selectedKey, setSelectedKey] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = ({ key }) => setSelectedKey(key);

  const isZoomed = windowWidth <= 1200;
  const sidebarWidth = isZoomed
    ? isOpen ? "w-0" : "w-20"
    : isMobile
    ? isOpen ? "w-0" : "w-20"
    : isOpen
    ? "w-[18rem] transition-all duration-300 translate-x-0"
    : "w-20 transition-all duration-300 translate-x-0";
    
  const role = session?.access_type;
  const menuConfig =
    role === "Administrator"
  ? AdminMenuConfig
  : role === "Customer" ? CustomerMenuConfig
  : 
  [];

  const transformedItems = transformMenuItems(menuConfig, isOpen);

  return (
    <div
      className={`fixed top-0 left-0 h-screen sidebar text-[var(--main-color)] overflow-y-auto overflow-x-hidden z-50 ${sidebarWidth} bg-white`}
    >
      <div className="flex justify-center items-center">
        <img
          src={isOpen ? Brand : Logo}
          alt="Sidebar Logo"
          className={`transition-all duration-300 mx-auto my-4 ${isOpen ? "w-[65%]" : "w-[60%]"}`}
        />
      </div>
      <hr className="border-[1px] border-b-[#eaecf4] m-[0_1rem_1rem]" />
      <Menu
        mode="inline"
        inlineCollapsed={!isOpen}
        items={transformedItems}
        theme="light"
        style={{ background: "transparent" }}
        onSelect={handleSelect}
        selectedKeys={[selectedKey]}
      />
    </div>
  );
};

export default Sidebar;
