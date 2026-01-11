import React, { useState } from "react";
import MaintenanceApi from "../DevTools/parts/MaintenanceApi";
import MaintenanceDashboard from "../DevTools/parts/MaintenanceDashboard";
import ToggleSectionButton from "../../../components/Buttons/ToggleSectionButton";

const DevTools = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [showSequence, setShowSequence] = useState(true);

  const handleCustomerDropdownClick = ({ key }) => {
    if (key === "add-new") {
      document.dispatchEvent(new CustomEvent("openCustomerDrawer"));
    } else if (key === "import") {
      alert("Importing customers...");
    }
  };

  const customerDropdownItems = [
    { key: "add-new", label: "Add New Customer" },
    { key: "import", label: "Import" },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Developer Tools</h2>
      </div>

      <div className="flex gap-5">
        {/* API's Section */}
        <div className="w-1/2">
          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">API's Settings</h3>
              <ToggleSectionButton
                isOpen={showUsers}
                onClick={() => setShowUsers((prev) => !prev)}
              />
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                showUsers ? "max-h-[1000px] mt-2" : "max-h-0"
              }`}
            >
              <MaintenanceApi
                dropdownItems={customerDropdownItems}
                onItemClick={handleCustomerDropdownClick}
              />
            </div>
          </div>
        </div>

        {/* Dashboard Owner Section */}
        <div className="w-1/2">
          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Dashboard Owner Settings</h3>
              <ToggleSectionButton
                isOpen={showSequence}
                onClick={() => setShowSequence((prev) => !prev)}
              />
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                showSequence ? "max-h-[1000px] mt-2" : "max-h-0"
              }`}
            >
              <MaintenanceDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevTools;
