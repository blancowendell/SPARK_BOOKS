import React, { useEffect, useState } from "react";
import FloatingInput from "../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../components/Forms/FloatingSelect";
import FloatingNumberInput from "../../../components/Forms/FloatingNumberInput";
import FloatingTextArea from "../../../components/Forms/FloatingTextArea";
import Table from "../../../components/Tables";
import Drawer from "../../../components/Modals/AntdDrawer";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../components/ActionsCenter/Alerts/Toast";
import ToggleStatusButton from "../../../components/Buttons/ToggleStatus";

import CoaAPI from "../../../api/private/chart_of_accounts/coaAPI";
import CoaTypeAPI from "../../../api/private/maintain/coaTypeAPI";
import CoaRunBalAPI from "../../../api/private/chart_of_accounts/coaRunBalAPI";

const ChartOfAccounts = () => {
  const [coaList, setCoaList] = useState([]);
  const [coaTypes, setCoaTypes] = useState([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [id, setId] = useState(null);

  const [typeId, setTypeId] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [description, setDescription] = useState("");
  const [runningBal, setRunningBal] = useState(0);
  const [status, setStatus] = useState("ACTIVE");

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [coaRunBalList, setCoaRunBalList] = useState([]);
  const [viewingCoa, setViewingCoa] = useState(null);

  useEffect(() => {
    loadCoa();
    loadCoaTypes();
  }, []);

  const loadCoa = async () => {
    try {
      const data = await CoaAPI.loadCoa();
      setCoaList(data);
    } catch {
      showErrorToast("Failed to load Chart of Accounts");
    }
  };

  const loadCoaTypes = async () => {
    try {
      const data = await CoaTypeAPI.loadCoaType();
      setCoaTypes(data);
    } catch {
      showErrorToast("Failed to load COA Types");
    }
  };

  const openAddDrawer = () => {
    setIsEditMode(false);
    setId(null);
    setTypeId("");
    setAccountCode("");
    setDescription("");
    setRunningBal(0);
    setStatus("ACTIVE");
    setIsDrawerOpen(true);
  };

  const openEditDrawer = async (coaId) => {
    try {
      setIsEditMode(true);
      const data = await CoaAPI.getCoa(coaId);

      if (data && data.length > 0) {
        const row = data[0];
        setId(row.id);
        setTypeId(row.coa_type_id);
        setAccountCode(row.account_code);
        setDescription(row.description);
        setRunningBal(row.running_bal);
        setStatus(row.status || "ACTIVE");
        setIsDrawerOpen(true);
      } else {
        showErrorToast("COA not found");
      }
    } catch {
      showErrorToast("Failed to load COA details");
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSave = async () => {
    if (!description || runningBal === "") {
      return showWarningToast("All fields are required");
    }

    try {
      if (isEditMode) {
        await CoaAPI.editCoa(id, description, runningBal, status);
        showSuccessToast("Chart of Account updated successfully");
      } else {
        if (!typeId) {
          return showWarningToast("COA Type is required");
        }

        await CoaAPI.addCoa(typeId, description, runningBal);
        showSuccessToast("Chart of Account added successfully");
      }

      closeDrawer();
      loadCoa();
    } catch (error) {
      console.error(error);

      const backendMsg =
        error?.response?.data?.msg || error?.response?.data?.message;

      if (backendMsg) {
        return showWarningToast(backendMsg);
      }

      showErrorToast(
        isEditMode
          ? "Failed to update Chart of Account"
          : "Failed to add Chart of Account",
      );
    }
  };

  const openViewDrawer = async (coaId, coaRow) => {
    try {
      const data = await CoaRunBalAPI.getCoaRunBal(coaId);
      setCoaRunBalList(data || []);
      setViewingCoa(coaRow);
      setIsViewDrawerOpen(true);
    } catch {
      showErrorToast("Failed to load COA running balance history");
    }
  };

  const runBalHeaders = ["Date", "Reference", "Debit", "Credit", "Balance"];

  const runBalKeys = ["date", "reference", "debit", "credit", "amount"];

  const runBalTableData = coaRunBalList.map((row) => ({
    date: row.trans_date,
    reference: row.reference_no,
    debit: row.debit,
    credit: row.credit,
    amount: row.running_balance,
  }));

  const headers = [
    "Account Code",
    "Description",
    "Type",
    "Running Balance",
    "Status",
    "Actions",
  ];

  const keys = [
    "accountCode",
    "description",
    "type",
    "amount",
    "status",
    "actions",
  ];

  const tableOptions = { withEdit: true, withView: true };

  const tableData = coaList.map((row) => ({
    id: row.id,
    accountCode: row.account_code,
    description: row.description,
    type: row.mct_account_type,
    amount: row.running_bal,
    status: row.status,
    actions: "",
  }));

  const handleDropdownClick = ({ key }) => {
    if (key === "add-new") {
      openAddDrawer();
    }
  };

  return (
    <div className="p-5 space-y-3">
      <div>
        <h3 className="text-xl font-semibold mb-1">Chart of Accounts</h3>
        <p className="text-sm text-gray-500">
          Masters Data for Chart of Accounts
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <Table
          headers={headers}
          data={tableData}
          keys={keys}
          {...tableOptions}
          dropdownItems={[{ key: "add-new", label: "Add New Account" }]}
          onItemClick={handleDropdownClick}
          onEditClick={(row) => openEditDrawer(row.id)}
          onViewClick={(row) => openViewDrawer(row.id, row)}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={isEditMode ? "Edit Account" : "Add Account"}
        width={500}
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {!isEditMode && (
            <div>
              <FloatingSelect
                id="typeId"
                label="Account Type"
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                options={coaTypes.map((t) => ({
                  value: t.id,
                  label: `${t.account_name} (${t.segment_start})`,
                }))}
              />
            </div>
          )}

          {isEditMode && (
            <div>
              <FloatingInput
                id="accountCode"
                label="Account Code"
                value={accountCode}
                disabled
              />
            </div>
          )}

          <div>
            <FloatingTextArea
              id="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <FloatingNumberInput
              id="runningBal"
              label="Running Balance"
              value={runningBal}
              onChange={(val) => setRunningBal(val)}
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
              <span>{isEditMode ? "Update" : "Add"} Account</span>
            </button>
          </div>
        </form>
      </Drawer>

      <Drawer
        isOpen={isViewDrawerOpen}
        onClose={() => setIsViewDrawerOpen(false)}
        title={`Running Balance History — ${viewingCoa?.accountCode || ""}`}
        width={800}
      >
        <Table
          headers={runBalHeaders}
          keys={runBalKeys}
          data={runBalTableData}
          rowsPerPage={10}
          withActions={false}
        />

        <div className="flex justify-between space-x-4 mt-4">
          <button
            type="button"
            onClick={setIsViewDrawerOpen.bind(null, false)}
            className="px-4 py-2 bg-gray-300 rounded-md flex items-center space-x-2"
          >
            <TbXboxXFilled />
            <span>Close</span>
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default ChartOfAccounts;
