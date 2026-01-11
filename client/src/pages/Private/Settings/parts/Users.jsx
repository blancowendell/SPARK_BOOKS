import React, { useState, useEffect } from "react";
import FloatingInput from "../../../../components/Forms/FloatingInput";
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

const Users = () => {
  const headers = ["ID", "Ticket Seq ID", "Username", "Status", "Actions"];
  const keys = ["id", "name", "username", "status", "actions"];
  const tableOptions = { withImage: false, withEdit: true, withDelete: false };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [ticketSequenceId, setTicketSequenceId] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchSequences();
  }, []);

  useEffect(() => {
    if (editingUser) {
      setTicketSequenceId(String(editingUser.ticket_sequence_id));
      setFullname(editingUser.fullname);
      setUsername(editingUser.username);
      setStatus(editingUser.status);
    }
  }, [editingUser]);

  const fetchUsers = async () => {
    try {
      const data = await UsersAPI.loadUsers();
      setUsers(data);
    } catch (error) {
      showErrorToast("Failed to load users");
    }
  };

  const fetchSequences = async () => {
    try {
      const data = await SequenceAPI.loadNotInitialSequence();
      setSequences(data);
    } catch (error) {
      showErrorToast("Failed to load ticket sequences");
    }
  };

  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingUser(null);
    resetForm();
  };

  const resetForm = () => {
    setTicketSequenceId("");
    setFullname("");
    setUsername("");
    setPassword("");
    setStatus("ACTIVE");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingUser) {
        response = await UsersAPI.editUsers(
          editingUser.id,
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
        editingUser ? "User updated successfully!" : "User added successfully!"
      );
      await fetchUsers();
      closeDrawer();
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to save user");
    }
  };

  const handleEditClick = async (row) => {
    try {
      const [detailedUser] = await UsersAPI.getUsers(row.id);
      setEditingUser(detailedUser);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to load user data");
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
    { key: "add-new", label: "Add New User" },
    { key: "import", label: "Import" },
  ];

  const data = users.map((user, index) => ({
    id: index + 1,
    name: user.prefix,
    fullname: user.fullname,
    username: user.username,
    status: user.status,
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
        title={editingUser ? "Edit User" : "Add New User"}
        width={400}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <FloatingSelect
              id="ticket_sequence_id"
              label="Ticket Sequence"
              value={ticketSequenceId}
              onChange={(e) => setTicketSequenceId(e.target.value)}
              options={sequences.map((seq) => ({
                value: String(seq.id),
                label: seq.prefix,
              }))}
            />
          </div>

          <div>
            <FloatingInput
              id="fullname"
              label="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div>
            <FloatingInput
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            {!editingUser && (
              <FloatingInput
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>

          <div>
            {editingUser && (
              <FloatingSelect
                id="status"
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { value: "ACTIVE", label: "ACTIVE" },
                  { value: "INACTIVE", label: "INACTIVE" },
                ]}
              />
            )}
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
              <span>{editingUser ? "Update" : "Add"} User</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Users;
