import { Link } from "react-router-dom";

export const transformMenuItems = (items, isOpen) => {
  return items.map((item) => {
    if (item.type === "group") {
      return {
        type: "group",
        label: isOpen ? (
          <div className="flex items-center text-left p-[0_1rem] font-[800] uppercase text-[#ffffffbd] text-[var(--main-color)]">
            <div className="flex-1 border-t mx-1 border-[var(--main-color)]" style={{ borderTopWidth: "2px" }}></div>
            <span className="sm:text-[11px] tracking-wider text-[10px] py-1 uppercase text-[var(--main-color)]">
              {item.label}
            </span>
            <div className="flex-1 border-t mx-1 border-[var(--main-color)]" style={{ borderTopWidth: "2px" }}></div>
          </div>
        ) : null,
        children: transformMenuItems(item.children || [], isOpen),
      };
    }

    const base = {
      key: item.key,
      icon: item.icon && (
        <span className="flex items-center justify-center">{item.icon}</span>
      ),
      label: item.link ? (
        <Link to={item.link}>
          <span className="text-base font-bold">{item.label}</span>
        </Link>
      ) : (
        <span className="text-base font-bold">{item.label}</span>
      ),
    };

    if (item.children) {
      return {
        ...base,
        children: transformMenuItems(item.children, isOpen),
      };
    }

    return base;
  });
};
