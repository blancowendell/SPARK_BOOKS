import { useState, useEffect } from "react";
import {
  AiOutlineDashboard,
  AiOutlineSetting,
  AiOutlineCustomerService,
} from "react-icons/ai";
import { FaRegFileCode } from "react-icons/fa";
import { PiTicketBold } from "react-icons/pi";
import { TbCategory, TbReport } from "react-icons/tb";
import { GrHostMaintenance } from "react-icons/gr";
import { MdOutlineInventory2 } from "react-icons/md";

export const AdminMenuConfig = [
  {
    key: "dashboard",
    icon: <AiOutlineDashboard size={20} />,
    label: "Dashboard",
    link: "/index",
  },
  {
    type: "group",
    label: "Masters",
    children: [
      {
        key: "masterTabs",
        icon: <TbCategory size={20} />,
        label: "Master's",
        children: [
          { key: "chartOfAccountsPanel", label: "Chart of Accounts", link: "chartOfAccounts" },
          { key: "customerPanel", label: "Customer", link: "customer" },
          { key: "employeePanel", label: "Employee", link: "employees" },
          { key: "samplePagePanel", label: "Sample Page", link: "samplepage" },
        ],
      },
      // {
      //   key: "customers",
      //   icon: <AiOutlineCustomerService size={24} />,
      //   label: "Customers",
      //   link: "customer",
      // },
      {
        key: "inventoryTabs",
        icon: <MdOutlineInventory2 size={20} />,
        label: "Inventory",
        children: [
          { key: "inventoryPanel", label: "Inventory List", link: "inventory" },
          { key: "inventoryHistoryPanel", label: "Inventory History", link: "inventoryHistory" },
        ],
      },
      {
        key: "maintain",
        icon: <GrHostMaintenance size={20} />,
        label: "Maintain",
        link: "maintainPanel",
      },
      {
        key: "reports",
        icon: <TbReport size={20} />,
        label: "Reports",
        link: "reportsPanel",
      },
      {
        key: "settingTabs",
        icon: <AiOutlineSetting size={20} />,
        label: "Settings",
        children: [
          { key: "settingsPanel", label: "Settings", link: "settings" },
        ],
      },
      {
        key: "developerTabs",
        icon: <FaRegFileCode size={20} />,
        label: "Developer Tabs",
        children: [
          { key: "devToolsPanel", label: "Dev Tools", link: "devtools" },
        ],
      },

      // {
      //     key: "userSlides",
      //     icon: <UserOutlined />,
      //     label: "Users",
      //     children: [
      //         {
      //             type: "group",
      //             key: "employee",
      //             label: "Employee:",
      //             children: [
      //                 { key: "addusers", label: "Add Users", link: "/users" },
      //                 { key: "viewuser", label: "View Users", link: "/" },
      //             ],
      //         },
      //         {
      //             type: "group",
      //             key: "settings",
      //             label: "Settings:",
      //             children: [
      //                 { key: "addsettings", label: "Add Settings", link: "/" },
      //             ],
      //         },
      //     ],
      // },
    ],
  },
];
