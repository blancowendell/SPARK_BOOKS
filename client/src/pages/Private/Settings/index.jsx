import React, { useState, useRef, useEffect } from "react";
import MaintenanceUsers from "../Settings/parts/Users";
import MaintenanceSequence from "../Settings/parts/Sequence";
import ToggleSectionButton from "../../../components/Buttons/ToggleSectionButton";
import Access from "./parts/Access";
import AccessType from "./parts/AccessType";
import { useGlobalTour } from "../../../components/Tour/context/TourContext";

const Settings = () => {
  const [showUsers, setShowUsers] = useState(false);
  const [showSequence, setShowSequence] = useState(false);
  const [showAccessSettings, setShowAccessSettings] = useState(false);
  const [selectedAccessId, setSelectedAccessId] = useState(null);

  const accessTableRef = useRef(null);
  const { startTour } = useGlobalTour();

  const handleAccessSelect = (id) => {
    setSelectedAccessId(id);
  };
  const handleCustomerDropdownClick = ({ key }) => {
    if (key === "add-new") {
      document.dispatchEvent(new CustomEvent("openCustomerDrawer"));
    } else if (key === "import") {
      alert("Importing customers...");
    }
  };

  const handleAccessUpdated = () => {
    // Optional: logic to refresh AccessType when Access updates
  };

  const handleAccessTypeUpdated = () => {
    // Optional: logic after AccessType update
  };

  useEffect(() => {
    if (showAccessSettings) {
      const steps = [
        {
          title: "Access Table",
          description: "Click any row in this table to see its access types.",
          target: () => accessTableRef.current,
        },
      ];
      startTour(steps);
    }
  }, [showAccessSettings]);

  const customerDropdownItems = [
    { key: "add-new", label: "Add New Customer" },
    { key: "import", label: "Import" },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Settings</h2>
      </div>

      <div className="flex gap-5 mb-5">
        <div className="w-full">
          <div className="bg-white shadow rounded-2xl p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Access Settings</h3>
              <ToggleSectionButton
                isOpen={showAccessSettings}
                onClick={() => setShowAccessSettings((prev) => !prev)}
              />
            </div>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                showAccessSettings ? "max-h-[2000px] mt-2" : "max-h-0"
              }`}
            >
              {/* Access + AccessType side-by-side */}
              <div className="grid grid-cols-2 gap-5 mt-3">
                {/* Access Table */}
                <div ref={accessTableRef}>
                  <Access
                    onAccessUpdated={handleAccessUpdated}
                    onAccessSelect={handleAccessSelect}
                  />
                </div>

                {/* AccessType Table */}
                <div>
                  <AccessType
                    accessId={selectedAccessId}
                    onAccessTypeUpdated={handleAccessTypeUpdated}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Users Section */}
        <div className="w-1/2">
          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Users Settings</h3>
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
              <MaintenanceUsers
                dropdownItems={customerDropdownItems}
                onItemClick={handleCustomerDropdownClick}
              />
            </div>
          </div>
        </div>

        {/* Sequence Section */}
        <div className="w-1/2">
          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Sequence Settings</h3>
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
              <MaintenanceSequence />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
