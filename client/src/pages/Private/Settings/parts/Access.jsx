import React, { useState, useEffect } from "react";
import FloatingInput from "../../../../components/Forms/FloatingInput";
import Table from "../../../../components/Tables";
import Drawer from "../../../../components/Modals/AntdDrawer";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../../components/ActionsCenter/Alerts/Toast";
import AccessAPI from "../../../../api/private/access/accessAPI";
import ToggleStatusButton from "../../../../components/Buttons/ToggleStatus";

const Access = ({ onAccessUpdated, onAccessSelect }) => {
  const headers = ["Access ID", "Access Name", "Status", "Actions"];
  const keys = ["id", "name", "status", "actions"];
  const tableOptions = { withImage: false, withEdit: true, withDelete: false };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [accessList, setAccessList] = useState([]);
  const [editingAccess, setEditingAccess] = useState(null);

  const [accessName, setAccessName] = useState("");
  const [accessStatus, setAccessStatus] = useState("ACTIVE");

  useEffect(() => {
    fetchAccess();
  }, []);

  useEffect(() => {
    if (editingAccess) {
      setAccessName(editingAccess.name || "");
      setAccessStatus(editingAccess.status || "ACTIVE");
    }
  }, [editingAccess]);

  const fetchAccess = async () => {
    try {
      const data = await AccessAPI.loadAccess();
      setAccessList(data);
    } catch (error) {
      showErrorToast("Failed to load access list");
    }
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingAccess(null);
    resetForm();
  };

  const resetForm = () => {
    setAccessName("");
    setAccessStatus("ACTIVE");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (editingAccess) {
        response = await AccessAPI.updateAccess(
          editingAccess.id,
          accessName,
          accessStatus
        );
      } else {
        response = await AccessAPI.addAccess(accessName);
      }

      if (response?.msg === "exist") {
        showWarningToast("Access name already exists!");
        return;
      }

      showSuccessToast(
        editingAccess
          ? "Access updated successfully!"
          : "Access added successfully!"
      );
      await fetchAccess();
      onAccessUpdated?.();
      closeDrawer();
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to save access");
    }
  };

  const handleEditClick = async (row) => {
    try {
      const [access] = await AccessAPI.getAccess(row.id);
      setEditingAccess(access);
      setIsDrawerOpen(true);
    } catch {
      showErrorToast("Failed to load access data");
    }
  };

  const handleRowClick = (row) => {
    if (onAccessSelect) {
      onAccessSelect(row.id);
    }
  };

  const handleDropdownClick = ({ key }) => {
    if (key === "add-new") {
      openDrawer();
    }
  };

  const dropdownItems = [{ key: "add-new", label: "Add New Access" }];

  const data = accessList.map((acc) => ({
    id: acc.id,
    name: acc.name,
    status: acc.status,
    actions: "",
    ...acc,
  }));

  return (
    <div className="p-5">
      <div className="overflow-x-auto rounded-xl shadow h-200">
        <Table
          headers={headers}
          data={data}
          keys={keys}
          {...tableOptions}
          dropdownItems={dropdownItems}
          onItemClick={handleDropdownClick}
          onEditClick={handleEditClick}
          onRowClick={handleRowClick}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingAccess ? "Edit Access" : "Add New Access"}
        width={400}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <FloatingInput
              id="accessName"
              label="Access Name"
              value={accessName}
              onChange={(e) => setAccessName(e.target.value)}
            />
          </div>

          {editingAccess && (
            <div>
              <label className="block text-gray-700 mb-2">Status</label>
              <ToggleStatusButton
                value={
                  accessStatus === true
                    ? "ACTIVE"
                    : accessStatus === false
                    ? "INACTIVE"
                    : accessStatus
                }
                onChange={(val) =>
                  setAccessStatus(
                    val === true || val === "ACTIVE" ? "ACTIVE" : "INACTIVE"
                  )
                }
                statusOptions={[
                  { label: "ACTIVE", value: true },
                  { label: "INACTIVE", value: false },
                ]}
              />
            </div>
          )}

          <div className="flex justify-between space-x-4 mt-4">
            <button
              type="button"
              onClick={closeDrawer}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 flex items-center space-x-2"
            >
              <TbXboxXFilled />
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-md flex items-center space-x-2"
              style={{
                backgroundColor: "var(--main-color)",
                color: "var(--main-text-color)",
              }}
            >
              <LuSaveAll />
              <span>{editingAccess ? "Update" : "Add"} Access</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Access;
