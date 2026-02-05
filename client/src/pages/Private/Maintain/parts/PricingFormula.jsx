import React, { useEffect, useState } from "react";
import FloatingInput from "../../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../../components/Forms/FloatingSelect";
import Table from "../../../../components/Tables";
import Drawer from "../../../../components/Modals/AntdDrawer";
import ToggleStatusButton from "../../../../components/Buttons/ToggleStatus";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../../components/ActionsCenter/Alerts/Toast";
import PricingAPI from "../../../../api/private/maintain/pricingAPI";

const PricingFormula = () => {
  const headers = [
    "Code",
    "Name",
    "Type",
    "Operation",
    "Value",
    "Precision",
    "Status",
    "Actions",
  ];

  const keys = [
    "code",
    "name",
    "pricingType",
    "operation",
    "value",
    "roundingPrecision",
    "status",
    "actions",
  ];

  const tableOptions = { withEdit: true, withDelete: false };

  const [formulas, setFormulas] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingFormula, setEditingFormula] = useState(null);

  /* ================= FORM STATES ================= */
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [operation, setOperation] = useState("");
  const [value, setValue] = useState("");
  const [roundingPrecision, setRoundingPrecision] = useState(2);
  const [status, setStatus] = useState("ACTIVE");

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchFormulas();
  }, []);

  useEffect(() => {
    if (editingFormula) {
      setCode(editingFormula.code || "");
      setName(editingFormula.name || "");
      setPricingType(editingFormula.pricing_type || "");
      setOperation(editingFormula.operation || "");
      setValue(editingFormula.value || "");
      setRoundingPrecision(editingFormula.rounding_rule ?? 2);
      setStatus(editingFormula.status || "ACTIVE");
    }
  }, [editingFormula]);

  /* ================= API ================= */
  const fetchFormulas = async () => {
    try {
      const data = await PricingAPI.loadPricingFormula();
      setFormulas(data);
    } catch {
      showErrorToast("Failed to load pricing formulas");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !name || !pricingType || !operation || !value) {
      showWarningToast("Please fill all required fields");
      return;
    }

    try {
      let response;

      if (editingFormula) {
        response = await PricingAPI.editPricingFormula(
          editingFormula.id,
          code,
          name,
          pricingType,
          operation,
          value,
          roundingPrecision,
          status,
        );
      } else {
        response = await PricingAPI.addPricingFormula(
          code,
          name,
          pricingType,
          operation,
          value,
          roundingPrecision,
        );
      }

      if (response?.msg === "exist") {
        showWarningToast("Pricing formula already exists");
        return;
      }

      showSuccessToast(
        editingFormula
          ? "Pricing formula updated successfully!"
          : "Pricing formula added successfully!",
      );

      fetchFormulas();
      closeDrawer();
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to save pricing formula");
    }
  };

  const handleEditClick = async (row) => {
    try {
      const [data] = await PricingAPI.getPricingFormula(row.id);
      setEditingFormula(data);
      setIsDrawerOpen(true);
    } catch {
      showErrorToast("Failed to load pricing formula details");
    }
  };

  /* ================= UI HELPERS ================= */
  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingFormula(null);
    resetForm();
  };

  const resetForm = () => {
    setCode("");
    setName("");
    setPricingType("");
    setOperation("");
    setValue("");
    setRoundingPrecision(2);
    setStatus("ACTIVE");
  };

  const dropdownItems = [{ key: "add-new", label: "Add Pricing Formula" }];

  const handleDropdownClick = ({ key }) => {
    if (key === "add-new") openDrawer();
  };

  const data = formulas.map((f) => ({
    id: f.id,
    code: f.code,
    name: f.name,
    pricingType: f.pricing_type,
    operation: f.operation,
    value: f.value,
    roundingPrecision: f.rounding_rule,
    status: f.status,
    ...f,
  }));

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Pricing Formula</h2>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <Table
          headers={headers}
          keys={keys}
          data={data}
          {...tableOptions}
          dropdownItems={dropdownItems}
          onItemClick={handleDropdownClick}
          onEditClick={handleEditClick}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingFormula ? "Edit Pricing Formula" : "Add Pricing Formula"}
        width={700}
      >
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* ================= FORMULA INFO ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Formula Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                label="Formula Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <FloatingInput
                label="Formula Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ================= CALCULATION RULE ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculation Rule</h3>

            <div className="grid grid-cols-2 gap-4">
              <FloatingSelect
                label="Pricing Type"
                value={pricingType}
                onChange={(e) => setPricingType(e.target.value)}
                options={[
                  { value: "PERCENT", label: "Percent (%)" },
                  { value: "AMOUNT", label: "Fixed Amount" },
                ]}
              />

              <FloatingSelect
                label="Operation"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                options={[
                  { value: "INCREASE", label: "Increase" },
                  { value: "DECREASE", label: "Decrease" },
                ]}
              />

              <FloatingInput
                label={
                  pricingType === "PERCENT"
                    ? "Percentage Value (%)"
                    : "Amount Value"
                }
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <FloatingSelect
                label="Rounding Rule"
                value={roundingPrecision}
                onChange={(e) => setRoundingPrecision(e.target.value)}
                options={[
                  { value: "NONE", label: "No Rounding" },
                  { value: "ROUND_UP", label: "Round Up" },
                  { value: "ROUND_DOWN", label: "Round Down" },
                  { value: "ROUND_NEAREST", label: "Round to Nearest" },
                ]}
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ================= STATUS ================= */}
          {editingFormula && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Status</h3>

              <ToggleStatusButton
                value={status}
                onChange={(val) => setStatus(val ? "ACTIVE" : "INACTIVE")}
                statusOptions={[
                  { label: "ACTIVE", value: true },
                  { label: "INACTIVE", value: false },
                ]}
              />
            </div>
          )}

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={closeDrawer}
              className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2"
            >
              <TbXboxXFilled />
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-md flex items-center gap-2"
              style={{
                backgroundColor: "var(--main-color)",
                color: "var(--main-text-color)",
              }}
            >
              <LuSaveAll />
              {editingFormula ? "Update" : "Add"} Formula
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default PricingFormula;
