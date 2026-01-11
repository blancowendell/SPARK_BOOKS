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


export const AdminMenuConfig = [
  {
    key: "dashboard",
    icon: <AiOutlineDashboard size={24} />,
    label: "Dashboard",
    link: "/index",
  },
  {
    type: "group",
    label: "Masters",
    children: [
      {
        key: "masterTabs",
        icon: <TbCategory size={24} />,
        label: "Master's",
        children: [
          { key: "chartOfAccountsPanel", label: "Chart of Accounts", link: "chartOfAccounts" },
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
        key: "maintain",
        icon: <GrHostMaintenance size={24} />,
        label: "Maintain",
        link: "maintainPanel",
      },
      {
        key: "reports",
        icon: <TbReport size={24} />,
        label: "Reports",
        link: "reportsPanel",
      },
      {
        key: "settingTabs",
        icon: <AiOutlineSetting size={24} />,
        label: "Settings",
        children: [
          { key: "settingsPanel", label: "Settings", link: "settings" },
        ],
      },
      {
        key: "developerTabs",
        icon: <FaRegFileCode size={24} />,
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
