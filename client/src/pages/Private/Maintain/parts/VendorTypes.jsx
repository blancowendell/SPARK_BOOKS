import React, { useEffect, useState } from "react";
import FloatingInput from "../../../../components/Forms/FloatingInput";
import FloatingTextArea from "../../../../components/Forms/FloatingTextArea";
import Table from "../../../../components/Tables";
import Drawer from "../../../../components/Modals/AntdDrawer";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../../components/ActionsCenter/Alerts/Toast";
import VendorTypeAPI from "../../../../api/private/maintain/vendorTypeAPI";
import ToggleStatusButton from "../../../../components/Buttons/ToggleStatus";

const VendorTypes = () => {
  const [vendorTypes, setVendorTypes] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);

  // form state
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    loadVendorTypes();
  }, []);

  /* ===============================
     LOAD DATA
     =============================== */

  const loadVendorTypes = async () => {
    try {
      const data = await VendorTypeAPI.loadVendorType();
      setVendorTypes(data);
    } catch {
      showErrorToast("Failed to load Vendor Types");
    }
  };

  /* ===============================
     DRAWER CONTROLS
     =============================== */

  const openAddDrawer = () => {
    setIsEditMode(false);
    setId(null);
    setTypeName("");
    setDescription("");
    setStatus("ACTIVE");
    setIsDrawerOpen(true);
  };

  const openEditDrawer = async (vendorTypeId) => {
    try {
      setIsEditMode(true);
      const data = await VendorTypeAPI.getVendorType(vendorTypeId);

      if (data && data.length > 0) {
        const row = data[0];
        setId(row.id);
        setTypeName(row.type_name);
        setDescription(row.description);
        setStatus(row.status || "ACTIVE");
        setIsDrawerOpen(true);
      } else {
        showErrorToast("Vendor Type not found");
      }
    } catch {
      showErrorToast("Failed to load Vendor Type details");
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  /* ===============================
     SAVE HANDLER
     =============================== */

  const handleSave = async () => {
    if (!typeName || !description) {
      return showWarningToast("All fields are required");
    }

    try {
      if (isEditMode) {
        await VendorTypeAPI.editVendorType(id, typeName, description, status);
        showSuccessToast("Vendor Type updated successfully");
      } else {
        const res = await VendorTypeAPI.addVendorType(typeName, description);

        if (res?.msg === "exist") {
          return showWarningToast("Vendor Type already exists");
        }

        showSuccessToast("Vendor Type added successfully");
      }

      closeDrawer();
      loadVendorTypes();
    } catch (error) {
      console.error(error);

      const backendMsg =
        error?.response?.data?.msg || error?.response?.data?.message;

      if (backendMsg) {
        return showWarningToast(backendMsg);
      }

      showErrorToast(
        isEditMode
          ? "Failed to update Vendor Type"
          : "Failed to add Vendor Type"
      );
    }
  };

  /* ===============================
     TABLE CONFIG
     =============================== */

  const headers = ["Type Name", "Description", "Status", "Actions"];
  const keys = ["typeName", "description", "status", "actions"];
  const tableOptions = { withEdit: true };

  const tableData = vendorTypes.map((row) => ({
    id: row.id,
    typeName: row.type_name,
    description: row.description,
    status: row.status,
    actions: "",
  }));

  const handleDropdownClick = ({ key }) => {
    if (key === "add-new") {
      openAddDrawer();
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Vendor Types</h2>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <Table
          headers={headers}
          data={tableData}
          keys={keys}
          {...tableOptions}
          dropdownItems={[{ key: "add-new", label: "Add New Vendor Type" }]}
          onItemClick={handleDropdownClick}
          onEditClick={(row) => openEditDrawer(row.id)}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={isEditMode ? "Edit Vendor Type" : "Add Vendor Type"}
        width={400}
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <FloatingInput
              id="typeName"
              label="Vendor Type Name"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
            />
          </div>

          <div>
            <FloatingTextArea
              id="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {isEditMode && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Status</label>
              <ToggleStatusButton
                value={status}
                onChange={(val) => setStatus(val)}
                statusOptions={[
                  { label: "ACTIVE", value: "ACTIVE" },
                  { label: "INACTIVE", value: "INACTIVE" },
                ]}
              />
            </div>
          )}

          <div className="flex justify-between space-x-4 mt-4">
            <button
              type="button"
              onClick={closeDrawer}
              className="px-4 py-2 bg-gray-300 rounded-md flex items-center space-x-2"
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
              <span>{isEditMode ? "Update" : "Add"} Vendor Type</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default VendorTypes;
