import React, { useState, useEffect } from "react";
import FloatingInput from "../../../../components/Forms/FloatingInput";
import ToggleStatusButton from "../../../../components/Buttons/ToggleStatus";
import FloatingTextArea from "../../../../components/Forms/FloatingTextArea";
import Table from "../../../../components/Tables/index";
import Drawer from "../../../../components/Modals/index";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../../components/ActionsCenter/Alerts/Toast";
import MaintenaceApi from "../../../../api/private/dev_tools/presetAPI";


const MaintenanceApi = () => {
  const headers = ["ID", "Title", "API URL", "Status", "Actions"];
  const keys = ["id", "name", "api_name", "status", "actions"];
  const tableOptions = { withImage: false, withEdit: true, withDelete: false };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [apis, setApi] = useState([]);
  const [editingApis, setEditingApis] = useState(null);


  const [title, setTitle] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const openDrawer = () => setIsDrawerOpen(true);


  useEffect(() => {
    fetchApis();
  }, []);

  useEffect(() => {
    if (editingApis) {
      setTitle(editingApis.name);
      setApiUrl(editingApis.api_name);
      setDescription(editingApis.api_description);
      setStatus(editingApis.status);
    }
  }, [editingApis]);

  const fetchApis = async () => {
    try {
      const data = await MaintenaceApi.loadPreSetApi();
      setApi(data);
    } catch (error) {
      showErrorToast("Failed to load APIs");
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingApis(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setApiUrl("");
    setDescription("");
    setStatus("ACTIVE");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let response;
    if (editingApis) {
      response = await MaintenaceApi.editPresetApi(
        editingApis.id,
        title,
        apiUrl,
        description,
        status
      );
    } else {
      response = await MaintenaceApi.addPresetApi(
        title,
        apiUrl,
        description
      );
    }

    if (response?.msg === "exist") {
      const errorMessage = response?.data || "Api Exist Already Exists.";
      showWarningToast(errorMessage);
      return;
    }

    showSuccessToast(
      editingApis ? "API updated successfully!" : "API added successfully!"
    );
    await fetchApis();
    closeDrawer();
  } catch (error) {
    console.error(error);
    showErrorToast("Failed to save API");
  }
};


  const handleEditClick = async (row) => {
    try {
      const [detailedApis] = await MaintenaceApi.getPresetApi(row.id);
      setEditingApis(detailedApis);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to load api data");
    }
  };

  const handleDropdownClick = ({ key }) => {
    if (key === "add-new") {
      openDrawer();
    } else if (key === "import") {
      showSuccessToast("Importing data...");
    }
  };

  const dropdownItems = [
    { key: "add-new", label: "Add New API" },
    { key: "import", label: "Import" },
  ];

  const data = apis.map((api, index) => ({
    id: index + 1,
    name: api.prefix,
    api_name: api.api_name,
    status: api.status,
    actions: "",
    ...api,
  }));

  const statusOptions = [
    { label: "✅ Active", value: "ACTIVE" },
    { label: "🚫 Inactive", value: "INACTIVE" },
  ];


  return (
    <div className="p-5">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
      </div> */}

      <div className="overflow-x-auto rounded-xl shadow h-200">
        <Table
          headers={headers}
          data={data}
          keys={keys}
          {...tableOptions}
          dropdownItems={dropdownItems}
          onItemClick={handleDropdownClick}
          onEditClick={handleEditClick}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingApis ? "Edit API" : "Add New API"}
        width={400}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <FloatingInput
              id="title"
              label="API Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <FloatingInput
              id="apiurl"
              label="API URL"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
          </div>

          <div>
            <FloatingTextArea
              id="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>

          {editingApis && (
            <div>
              <ToggleStatusButton
                options={statusOptions}
                value={status}
                onChange={setStatus}
              />
              <div className="mt-4 text-gray-700">Current Status: {status}</div>
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
              <span>{editingApis ? "Update" : "Add"} API</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default MaintenanceApi;
