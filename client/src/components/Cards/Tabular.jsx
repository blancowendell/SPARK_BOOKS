// src/components/TicketTabs.jsx
import React, { useState } from "react";

const TabularTabs = ({ tabs, defaultKey = "" }) => {
  const [activeKey, setActiveKey] = useState(defaultKey || tabs[0]?.key);

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex border-b space-x-6">
        {tabs.map(({ key, label, icon }) => {
          const isActive = activeKey === key;

          return (
            <button
              key={key}
              onClick={() => setActiveKey(key)}
              className="flex items-center gap-2 pb-2 border-b-2 transition-all duration-200 font-medium"
              style={{
                borderBottomColor: isActive ? "var(--main-color)" : "transparent",
                color: isActive ? "var(--main-color)" : "black",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--main-hover-color)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "black";
                }
              }}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.map(
          ({ key, content }) =>
            activeKey === key && <div key={key}>{content}</div>
        )}
      </div>
    </div>
  );
};

export default TabularTabs;
