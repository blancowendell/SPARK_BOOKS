import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/ActionsCenter/Alerts/Toast";
import AccessTypeAPI from "../../../../api/private/access_type/accesstypeAPI";
import ToggleStatusButton from "../../../../components/Buttons/ToggleStatus";

const AccessType = ({ accessId, onAccessTypeUpdated }) => {
  const [accessTypes, setAccessTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (accessId) fetchAccessTypes();
  }, [accessId]);

  const fetchAccessTypes = async () => {
    try {
      setIsLoading(true);
      const data = await AccessTypeAPI.getAccessType(accessId);
      setAccessTypes(data);
    } catch (error) {
      showErrorToast("Failed to load access types");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (type) => {
    const newStatus =
      type.status === "ACTIVE" || type.status === true ? "INACTIVE" : "ACTIVE";

    try {
      const response = await AccessTypeAPI.updateAccessType(type.id, newStatus);

      if (response?.msg === "success") {
        showSuccessToast(
          `Access type "${type.name}" updated to ${newStatus.toUpperCase()}`
        );
        await fetchAccessTypes();
        onAccessTypeUpdated?.();
      } else {
        showErrorToast("Failed to update access type");
      }
    } catch (error) {
      console.error(error);
      showErrorToast("Error updating access type");
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Access Types{" "}
          {accessTypes.length > 0 ? (
            <span className="text-blue-600">{accessTypes[0].ma_name}</span>
          ) : (
            ""
          )}
        </h2>
      </div>

      <div className="h-[750px] overflow-y-auto space-y-3 rounded-xl shadow p-4 bg-white">
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : accessTypes.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No access types available
          </div>
        ) : (
          accessTypes.map((type, index) => (
            <motion.div
              key={type.id}
              className="flex justify-between items-center border-t border-b border-gray-300 rounded-lg p-4 hover:shadow-md transition-all"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="space-y-1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <p className="font-semibold text-gray-800">{type.name}</p>
                <p className="text-sm text-gray-500">{type.ma_name}</p>
                <p className="text-xs text-gray-400">ID: {type.id}</p>
              </motion.div>

              <ToggleStatusButton
                value={type.status === "ACTIVE"}
                onChange={() => handleStatusChange(type)}
                statusOptions={[
                  { label: "ACTIVE", value: true },
                  { label: "INACTIVE", value: false },
                ]}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AccessType;
