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
import CustomerTypeAPI from "../../../../api/private/maintain/customerTypeAPI";
import ToggleStatusButton from "../../../../components/Buttons/ToggleStatus";

const CustomerTypes = () => {
  const [customerTypes, setCustomerTypes] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);

  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    loadCustomerTypes();
  }, []);

  const loadCustomerTypes = async () => {
    try {
      const data = await CustomerTypeAPI.loadCustomerType();
      setCustomerTypes(data);
    } catch {
      showErrorToast("Failed to load Customer Types");
    }
  };

  const openAddDrawer = () => {
    setIsEditMode(false);
    setId(null);
    setTypeName("");
    setDescription("");
    setStatus("ACTIVE");
    setIsDrawerOpen(true);
  };

  const openEditDrawer = async (customerTypeId) => {
    try {
      setIsEditMode(true);
      const data = await CustomerTypeAPI.getCustomerType(customerTypeId);
      if (data && data.length > 0) {
        const row = data[0];
        setId(row.id);
        setTypeName(row.type_name);
        setDescription(row.description);
        setStatus(row.status || "ACTIVE");
        setIsDrawerOpen(true);
      } else {
        showErrorToast("Customer Type not found");
      }
    } catch {
      showErrorToast("Failed to load Customer Type details");
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSave = async () => {
    if (!typeName || !description) {
      return showWarningToast("All fields are required");
    }

    try {
      if (isEditMode) {
        await CustomerTypeAPI.editCustomerType(
          id,
          typeName,
          description,
          status
        );
        showSuccessToast("Customer Type updated successfully");
      } else {
        const res = await CustomerTypeAPI.addCustomerType(
          typeName,
          description
        );

        if (res?.msg === "exist") {
          return showWarningToast("Customer Type already exists");
        }

        showSuccessToast("Customer Type added successfully");
      }

      closeDrawer();
      loadCustomerTypes();
    } catch (error) {
      console.error(error);
      const backendMsg =
        error?.response?.data?.msg || error?.response?.data?.message;

      if (backendMsg) {
        return showWarningToast(backendMsg);
      }

      showErrorToast(
        isEditMode
          ? "Failed to update Customer Type"
          : "Failed to add Customer Type"
      );
    }
  };

  const headers = ["Type Name", "Description", "Status", "Actions"];
  const keys = ["typeName", "description", "status", "actions"];
  const tableOptions = { withEdit: true };

  const tableData = customerTypes.map((row) => ({
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
        <h2 className="text-2xl font-semibold">Customer Types</h2>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <Table
          headers={headers}
          data={tableData}
          keys={keys}
          {...tableOptions}
          dropdownItems={[{ key: "add-new", label: "Add New Customer Type" }]}
          onItemClick={handleDropdownClick}
          onEditClick={(row) => openEditDrawer(row.id)}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={isEditMode ? "Edit Customer Type" : "Add Customer Type"}
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
              label="Customer Type Name"
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
              <span>{isEditMode ? "Update" : "Add"} Customer Type</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default CustomerTypes;
