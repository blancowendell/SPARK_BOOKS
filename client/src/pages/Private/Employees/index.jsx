import React, { useState, useEffect } from "react";
import FloatingInput from "../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../components/Forms/FloatingSelect";
import Table from "../../../components/Tables/index";
import Drawer from "../../../components/Modals/AntdDrawer/index";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../components/ActionsCenter/Alerts/Toast";
import EmployeeAPI from "../../../api/private/employee/employeeAPI";
import SetupAPI from "../../../api/private/maintenance/sequenceAPI";
import ToggleStatusButton from "../../../components/Buttons/ToggleStatus";
import AccessAPI from "../../../api/private/access/accessAPI";

const Employee = () => {
  const headers = [
    "Employee ID",
    "Full Name", 
    "Email",
    "Access",
    "Status",
    "Actions",
  ];
  const keys = ["id", "name", "email", "access", "status", "actions"];
  const tableOptions = { withImage: true, withEdit: true, withDelete: true };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // form states
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [accessId, setAccessId] = useState("");
  const [sequenceId, setSequenceId] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  // dropdown data
  const [branches, setBranches] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [accesses, setAccesses] = useState([]);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchSequences();
    fetchAccesses();
  }, []);

  useEffect(() => {
    if (editingEmployee) {
      setFirstname(editingEmployee.first_name || "");
      setLastname(editingEmployee.last_name || "");
      setEmail(editingEmployee.email || "");
      setSequenceId(editingEmployee.sequence_id || "");
      setAccessId(editingEmployee.access_id || "");
      setStatus(editingEmployee.status || "ACTIVE");
    }
  }, [editingEmployee]);

  const fetchEmployees = async () => {
    try {
      const data = await EmployeeAPI.loadEmployees();
      setEmployees(data);
    } catch {
      showErrorToast("Failed to load employees");
    }
  };

  const fetchSequences = async () => {
    try {
      const data = await SetupAPI.loadSequence();
      setSequences(data);
    } catch {
      showErrorToast("Failed to load sequences");
    }
  };

  const fetchAccesses = async () => {
    try {
      const data = await AccessAPI.loadAccess();
      setAccesses(data);
    } catch {
      showErrorToast("Failed to load access");
    }
  };

  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingEmployee(null);
    resetForm();
  };

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setAccessId("");
    setSequenceId("");
    setStatus("ACTIVE");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingEmployee) {
        response = await EmployeeAPI.updateEmployee(
          editingEmployee.id,
          firstname,
          lastname,
          email,
          accessId,
          status
        );
      } else {
        response = await EmployeeAPI.addEmployee(
          firstname,
          lastname,
          email,
          accessId,
          sequenceId,
        );
      }

      if (response?.msg === "exist") {
        showWarningToast("Employee already exists!");
        return;
      }

      showSuccessToast(
        editingEmployee
          ? "Employee updated successfully!"
          : "Employee added successfully!"
      );
      await fetchEmployees();
      closeDrawer();
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to save employee");
    }
  };

  const handleEditClick = async (row) => {
    try {
      const [detailedEmployee] = await EmployeeAPI.getEmployee(row.id);
      setEditingEmployee(detailedEmployee);
      setIsDrawerOpen(true);
    } catch {
      showErrorToast("Failed to load employee data");
    }
  };

  const handleDropdownClick = ({ key }) => {
    if (key === "add-new") {
      openDrawer();
    }
  };

  const dropdownItems = [{ key: "add-new", label: "Add New Employee" }];

  const data = employees.map((emp, index) => ({
    id: emp.id,
    fullname: emp.fullname,
    email: emp.email,
    access: emp.name,
    status: emp.mu_status,
    actions: "",
    ...emp,
  }));

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Employee's</h2>
      </div>
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
        title={editingEmployee ? "Edit Employee" : "Add New Employee"}
        width={400}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <FloatingInput
              id="firstname"
              label="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div>
            <FloatingInput
              id="lastname"
              label="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div>
            <FloatingInput
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <FloatingSelect
              id="accessId"
              label="Access"
              value={accessId}
              onChange={(e) => setAccessId(e.target.value)}
              options={accesses.map((a) => ({
                value: String(a.id),
                label: a.name,
              }))}
            />
          </div>

          <div>
            {!editingEmployee && (
              <FloatingSelect
                id="sequenceId"
                label="Employee Sequence"
                value={sequenceId}
                onChange={(e) => setSequenceId(e.target.value)}
                options={sequences.map((seq) => ({
                  value: String(seq.id),
                  label: seq.employee_level,
                }))}
              />
            )}
          </div>

          <div>
            {editingEmployee && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Status</label>
                <ToggleStatusButton
                  value={status}
                  onChange={(val) => {
                    // normalize to boolean for DB
                    setStatus(val === true || val === "ACTIVE");
                  }}
                  statusOptions={[
                    { label: "ACTIVE", value: true },
                    { label: "INACTIVE", value: false },
                  ]}
                />
              </div>
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
              <span>{editingEmployee ? "Update" : "Add"} Employee</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Employee;
