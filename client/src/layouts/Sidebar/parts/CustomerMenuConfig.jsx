import {
  AiOutlineDashboard,
  AiOutlineSetting,
} from "react-icons/ai";
import { PiTicketBold } from "react-icons/pi";

export const CustomerMenuConfig = [
  {
    key: "dashboard",
    icon: <AiOutlineDashboard size={24} />,
    label: "Dashboard",
    link: "/customer/index",
  },
  {
    type: "group",
    label: "Tickets",
    children: [
      {
        key: "tickets",
        icon: <PiTicketBold size={24} />,
        label: "Tickets",
        children: [
          { key: "createTicket", label: "My Tickets", link: "createticket" },
          // { key: "viewTicket", label: "View Ticket", link: "viewticket" },
          { key: "myReports", label: "Reports", link: "reports" },
        ],
      },
    ],
  },
  {
    key: "settings",
    icon: <AiOutlineSetting size={24} />,
    label: "Settings",
    children: [
      { key: "customerSettings", label: "Account Settings", link: "settings" },
    ],
  },
];
