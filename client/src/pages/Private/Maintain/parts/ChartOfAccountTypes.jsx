import React, { useEffect, useState } from "react";
import FloatingInput from "../../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../../components/Forms/FloatingSelect";
import Table from "../../../../components/Tables";
import Drawer from "../../../../components/Modals/AntdDrawer";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../../components/ActionsCenter/Alerts/Toast";
import CoaTypeAPI from "../../../../api/private/maintain/coaTypeAPI";

const ACCOUNT_TYPES = [
  "Asset Accounts",
  "Liability Accounts",
  "Equity Accounts",
  "Revenue Accounts",
  "COGS Accounts",
  "Expense Accounts",
  "Other Accounts",
];

const SEGMENT_RANGES = [
  "1000-1999",
  "2000-2999",
  "3000-3999",
  "4000-4999",
  "5000-5999",
  "6000-6999",
  "7000-7999",
];

const ChartOfAccountType = () => {
  const [coaTypes, setCoaTypes] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);

  // form state
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [segmentStart, setSegmentStart] = useState("");

  useEffect(() => {
    loadCoaTypes();
  }, []);

  const loadCoaTypes = async () => {
    try {
      const data = await CoaTypeAPI.loadCoaType();
      setCoaTypes(data);
    } catch {
      showErrorToast("Failed to load Chart of Account Types");
    }
  };

  const openAddDrawer = () => {
    setIsEditMode(false);
    setId(null);
    setAccountName("");
    setAccountType("");
    setSegmentStart("");
    setIsDrawerOpen(true);
  };

  const openEditDrawer = async (coaTypeId) => {
    try {
      setIsEditMode(true);
      const data = await CoaTypeAPI.getCoaType(coaTypeId);
      if (data && data.length > 0) {
        const row = data[0];
        setId(row.id);
        setAccountName(row.account_name);
        setAccountType(row.account_type);
        setSegmentStart(row.segment_start);
        setIsDrawerOpen(true);
      } else {
        if (res?.status === 400) {
          return showWarningToast(res?.msg || "Failed to add COA Type");
        }
      }
    } catch {
      showErrorToast("Failed to load COA Type details");
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSave = async () => {
    if (!accountName || !accountType || !segmentStart) {
      return showWarningToast("All fields are required");
    }

    try {
      let res;

      if (isEditMode) {
        res = await CoaTypeAPI.editCoaType(
          id,
          accountName,
          accountType,
          segmentStart
        );

        showSuccessToast("COA Type updated successfully");
      } else {
        res = await CoaTypeAPI.addCoaType(
          accountName,
          accountType,
          segmentStart
        );

        showSuccessToast("COA Type added successfully");
      }

      closeDrawer();
      loadCoaTypes();
    } catch (error) {
      console.error(error);

      // ✅ THIS IS THE IMPORTANT PART
      const backendMsg =
        error?.response?.data?.msg || error?.response?.data?.message;

      if (backendMsg) {
        return showWarningToast(backendMsg);
      }

      showErrorToast(
        isEditMode ? "Failed to update COA Type" : "Failed to add COA Type"
      );
    }
  };

  const headers = [
    "Account Name",
    "Account Type",
    "Segment Range",
    "Status",
    "Actions",
  ];

  const keys = ["name", "type", "segment", "status", "actions"];
  const tableOptions = { withEdit: true };

  const tableData = coaTypes.map((row) => ({
    id: row.id,
    name: row.account_name,
    type: row.account_type,
    segment: row.segment_start,
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
        <h2 className="text-2xl font-semibold">Chart of Account Types</h2>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <Table
          headers={headers}
          data={tableData}
          keys={keys}
          {...tableOptions}
          dropdownItems={[{ key: "add-new", label: "Add New COA Type" }]}
          onItemClick={handleDropdownClick}
          onEditClick={(row) => openEditDrawer(row.id)}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={isEditMode ? "Edit COA Type" : "Add COA Type"}
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
              id="accountName"
              label="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>

          <div>
            <FloatingSelect
              id="accountType"
              label="Account Type"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              options={ACCOUNT_TYPES.map((type) => ({
                value: type,
                label: type,
              }))}
            />
          </div>

          <div>
            <FloatingSelect
              id="segmentStart"
              label="Segment Range"
              value={segmentStart}
              onChange={(e) => setSegmentStart(e.target.value)}
              options={SEGMENT_RANGES.map((seg) => ({
                value: seg,
                label: seg,
              }))}
            />
          </div>

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
              <span>{isEditMode ? "Update" : "Add"} COA Type</span>
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default ChartOfAccountType;
