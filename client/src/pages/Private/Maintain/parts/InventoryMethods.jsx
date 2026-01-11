import React, { useEffect, useState } from "react";
import FloatingInput from "../../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../../components/Forms/FloatingSelect";
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
import InventoryMethodAPI from "../../../../api/private/maintain/inventoryMethodAPI";
import ToggleStatusButton from "../../../../components/Buttons/ToggleStatus";

/* ENUM — must match backend */
const INVENTORY_METHOD_CODES = [
  { value: "FIFO", label: "FIFO (First In, First Out)" },
  { value: "LIFO", label: "LIFO (Last In, First Out)" },
  { value: "WAC", label: "WAC (Weighted Average Cost)" },
  { value: "STD", label: "STD (Standard Cost)" },
  { value: "SPEC", label: "SPEC (Specific Identification)" },
];

const InventoryMethods = () => {
  const [methods, setMethods] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);

  // form state
  const [code, setCode] = useState("");
  const [methodName, setMethodName] = useState("");
  const [methodDescription, setMethodDescription] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    loadInventoryMethods();
  }, []);

  /* ===============================
     LOAD DATA
     =============================== */

  const loadInventoryMethods = async () => {
    try {
      const data = await InventoryMethodAPI.loadInventoryMethods();
      setMethods(data);
    } catch {
      showErrorToast("Failed to load Inventory Methods");
    }
  };

  /* ===============================
     DRAWER CONTROLS
     =============================== */

  const openAddDrawer = () => {
    setIsEditMode(false);
    setId(null);
    setCode("");
    setMethodName("");
    setMethodDescription("");
    setStatus("ACTIVE");
    setIsDrawerOpen(true);
  };

  const openEditDrawer = async (methodId) => {
    try {
      setIsEditMode(true);
      const data = await InventoryMethodAPI.getInventoryMethod(methodId);

      if (data && data.length > 0) {
        const row = data[0];
        setId(row.mim_id || row.id);
        setCode(row.mim_code || row.code);
        setMethodName(row.mim_method_name || row.method_name);
        setMethodDescription(
          row.mim_method_description || row.method_description
        );
        setStatus(row.mim_status || row.status || "ACTIVE");
        setIsDrawerOpen(true);
      } else {
        showErrorToast("Inventory Method not found");
      }
    } catch {
      showErrorToast("Failed to load Inventory Method details");
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  /* ===============================
     SAVE HANDLER
     =============================== */

  const handleSave = async () => {
    if (!code || !methodName || !methodDescription) {
      return showWarningToast("All fields are required");
    }

    try {
      if (isEditMode) {
        await InventoryMethodAPI.editInventoryMethod(
          id,
          code,
          methodName,
          methodDescription,
          status
        );
        showSuccessToast("Inventory Method updated successfully");
      } else {
        const res = await InventoryMethodAPI.addInventoryMethod(
          code,
          methodName,
          methodDescription
        );

        if (res?.msg === "exist") {
          return showWarningToast("Inventory Method already exists");
        }

        showSuccessToast("Inventory Method added successfully");
      }

      closeDrawer();
      loadInventoryMethods();
    } catch (error) {
      console.error(error);

      const backendMsg =
        error?.response?.data?.msg ||
        error?.response?.data?.message;

      if (backendMsg) {
        return showWarningToast(backendMsg);
      }

      showErrorToast(
        isEditMode
          ? "Failed to update Inventory Method"
          : "Failed to add Inventory Method"
      );
    }
  };

  /* ===============================
     TABLE CONFIG
     =============================== */

  const headers = ["Code", "Method Name", "Description", "Status", "Actions"];
  const keys = ["code", "methodName", "description", "status", "actions"];
  const tableOptions = { withEdit: true };

  const tableData = methods.map((row) => ({
    id: row.mim_id || row.id,
    code: row.mim_code || row.code,
    methodName: row.mim_method_name || row.method_name,
    description: row.mim_method_description || row.method_description,
    status: row.mim_status || row.status,
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
        <h2 className="text-2xl font-semibold">Inventory Methods</h2>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <Table
          headers={headers}
          data={tableData}
          keys={keys}
          {...tableOptions}
          dropdownItems={[
            { key: "add-new", label: "Add New Inventory Method" },
          ]}
          onItemClick={handleDropdownClick}
          onEditClick={(row) => openEditDrawer(row.id)}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={
          isEditMode
            ? "Edit Inventory Method"
            : "Add Inventory Method"
        }
        width={450}
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <FloatingSelect
            id="code"
            label="Method Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            options={INVENTORY_METHOD_CODES}
            disabled={isEditMode} // code should not change
          />
          </div>

          <div>
            <FloatingInput
            id="methodName"
            label="Method Name"
            value={methodName}
            onChange={(e) => setMethodName(e.target.value)}
          />
          </div>

          <div>
            <FloatingTextArea
            id="methodDescription"
            label="Method Description"
            value={methodDescription}
            onChange={(e) => setMethodDescription(e.target.value)}
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
              <span>{isEditMode ? "Update" : "Add"} Method</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default InventoryMethods;
