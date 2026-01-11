import React, { useState, useEffect } from "react";
import FloatingInput from "../../../../components/Forms/FloatingInput";
import FloatingTextArea from "../../../../components/Forms/FloatingTextArea";
import FloatingSelect from "../../../../components/Forms/FloatingSelect";
import Table from "../../../../components/Tables/index";
import Drawer from "../../../../components/Modals/index";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../../components/ActionsCenter/Alerts/Toast";
import UsersAPI from "../../../../api/private/maintenance/usersAPI";
import SequenceAPI from "../../../../api/private/maintenance/sequenceAPI";
import DashboardAPI from "../../../../api/private/dev_tools/dashboardAPI";

const MaintenanceDashboard = () => {
  const headers = ["ID", "Full Name", "User Type", "Title", "Actions"];
  const keys = ["id", "name", "user_type", "title", "actions"];
  const tableOptions = { withImage: false, withEdit: true, withDelete: false };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dashboardOwner, setDashboardOwner] = useState([]);
  const [dashboardOwnerByUser, setDashboardOwnerByUser] = useState([]);

  const [editingDashboardOwner, setEditingDashboardOwner] = useState(null);

  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    fetchDashboardOwner();
    fetchDashboardOwnerByUser();
  }, []);

  useEffect(() => {
    if (editingDashboardOwner) {
      setUserId(String(editingDashboardOwner.user_id));
      setUserType(editingDashboardOwner.user_type);
      setTitle(editingDashboardOwner.title);
      setDescription(editingDashboardOwner.description);
      setOwner(editingDashboardOwner.owner);
    }
  }, [editingDashboardOwner]);

  const fetchDashboardOwner = async () => {
    try {
      const data = await DashboardAPI.loadDashboardOwner();
      setDashboardOwner(data);
    } catch (error) {
      showErrorToast("Failed to load users");
    }
  };

  const fetchDashboardOwnerByUser = async () => {
    try {
      const data = await DashboardAPI.loadDashboardOwnerByUser();
      setDashboardOwnerByUser(data);
      console.log("Dashboard Owner By User:", data);
      
    } catch (error) {
      showErrorToast("Failed to load dashboard owner by user");
    }
  };

  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingDashboardOwner(null);
    resetForm();
  };

  const resetForm = () => {
    setUserId("");
    setUserType("");
    setTitle("");
    setDescription("");
    setOwner("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingDashboardOwner) {
        response = await UsersAPI.editUsers(
          editingDashboardOwner.id,
          ticketSequenceId,
          fullname,
          username,
          status
        );
      } else {
        response = await UsersAPI.addUsers(
          ticketSequenceId,
          fullname,
          username,
          password
        );
      }

      if (response?.msg === "exist") {
        showWarningToast("User already exists!");
        return;
      }

      showSuccessToast(
        editingDashboardOwner
          ? "User updated successfully!"
          : "User added successfully!"
      );
      await fetchDashboardOwner();
      closeDrawer();
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to save user");
    }
  };

  const handleEditClick = (row) => {
    setEditingDashboardOwner(row);
    setUserId(row.user_id);
    setUserType(row.user_type);
    setTitle(row.title);
    setDescription(row.description);
    setOwner(row.owner);
    setIsDrawerOpen(true);
  };

  const handleDropdownClick = ({ key }) => {
    if (key === "add-new") {
      openDrawer();
    } else if (key === "import") {
      showSuccessToast("Importing data...");
    }
  };

  const dropdownItems = [
    { key: "add-new", label: "Add New User" },
    { key: "import", label: "Import" },
  ];

  // const data = dashboardOwner.map((user, index) => ({
  //   id: index + 1,
  //   name: user.fullname,
  //   user_type: user.user_type,
  //   title: user.title,
  //   actions: "",
  //   ...user,
  // }));
  
  const data = dashboardOwner.map((user) => ({
    id: user.id,
    name: user.fullname,
    user_type: user.user_type,
    title: user.title,
    actions: "",
    ...user,
  }));

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
        title={editingDashboardOwner ? "Edit User" : "Add New User"}
        width={400}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <FloatingSelect
              id="userId"
              label="User Dashboard Owner"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              options={dashboardOwnerByUser.map((user) => ({
                value: String(user.user_id),
                label: user.prefix + " " + user.user_type,
              }))}
            />
          </div>

          <div>
            <FloatingInput
              id="title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <FloatingInput
              id="owner"
              label="Owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
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
              <span>{editingDashboardOwner ? "Update" : "Add"} User</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default MaintenanceDashboard;
