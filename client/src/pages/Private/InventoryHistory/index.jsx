import React, { useEffect, useState } from "react";
import FloatingInput from "../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../components/Forms/FloatingSelect";
import Table from "../../../components/Tables";
import Drawer from "../../../components/Modals/AntdDrawer";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../components/ActionsCenter/Alerts/Toast";
import InventoryHistoryAPI from "../../../api/private/inventory/inventoryHistoryAPI";
import InventoryQuantityAPI from "../../../api/private/inventory/inventoryQuantityAPI";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";

const INVENTORY_OPERATIONS = [
  { value: "IN", label: "IN" },
  { value: "OUT", label: "OUT" },
];

const INVENTORY_METHODS = [
  { value: "INVOICE", label: "Invoice" },
  { value: "CREDIT", label: "Credit" },
  { value: "DEBIT", label: "Debit" },
  { value: "CASH", label: "Cash" },
  { value: "CHECK", label: "Check" },
  { value: "PURCHASE", label: "Purchase" },
  { value: "ADJUSTMENTS", label: "Adjustments" },
];

const InventoryHistory = () => {
  const headers = [
    "Date",
    "Item ID",
    "Cost",
    "Operation",
    "Method",
    "Quantity",
    "Created By",
    "Actions",
  ];

  const keys = [
    "created_at",
    "mi_item_id",
    "cost",
    "operation",
    "method",
    "qty",
    "created_by",
    "actions",
  ];

  const tableOptions = { withEdit: true, withDelete: false };

  const [histories, setHistories] = useState([]);
  const [inventoryQuantities, setInventoryQuantities] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);

  const [viewHistory, setViewHistory] = useState(null);

  const [quantityId, setQuantityId] = useState("");
  const [qty, setQty] = useState("");
  const [operation, setOperation] = useState("");
  const [method, setMethod] = useState("");

  useEffect(() => {
    fetchInventoryQuantities();
  }, []);

  useEffect(() => {
    if (!selectedItemId) {
      setHistories([]);
      return;
    }
    fetchHistory(selectedItemId);
  }, [selectedItemId]);

  const fetchInventoryQuantities = async () => {
    try {
      const data = await InventoryQuantityAPI.loadInventoryQuantity();
      setInventoryQuantities(data);
    } catch {
      showErrorToast("Failed to load inventory quantities");
    }
  };

  const fetchHistory = async (inventoryId) => {
    try {
      const data = await InventoryHistoryAPI.loadInventoryHistory(inventoryId);
      setHistories(data);
    } catch {
      showErrorToast("Failed to load inventory history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quantityId || !qty || !operation || !method) {
      showErrorToast("All fields are required");
      return;
    }

    const numericQty = Number(qty);
    if (numericQty <= 0) {
      showErrorToast("Quantity must be greater than zero");
      return;
    }

    try {
      await InventoryHistoryAPI.addInventoryHistory(
        quantityId,
        numericQty,
        operation,
        method,
      );

      showSuccessToast("Inventory adjustment recorded");

      if (selectedItemId) {
        fetchHistory(selectedItemId);
      }

      closeAddDrawer();
    } catch (error) {
      const backendMsg =
        error?.response?.data?.msg || error?.response?.data?.message;
      if (backendMsg) return showWarningToast(backendMsg);
      showErrorToast("Failed to add inventory adjustment");
    }
  };

  const handleViewClick = async (row) => {
    try {
      const data = await InventoryHistoryAPI.getInventoryHistory(row.id);
      setViewHistory(data[0]);
      setIsViewDrawerOpen(true);
    } catch {
      showErrorToast("Failed to load adjustment details");
    }
  };

  const closeAddDrawer = () => {
    setIsAddDrawerOpen(false);
    resetForm();
  };

  const closeViewDrawer = () => {
    setIsViewDrawerOpen(false);
    setViewHistory(null);
  };

  const resetForm = () => {
    setQuantityId("");
    setQty("");
    setOperation("");
    setMethod("");
  };

  const dropdownItems = [{ key: "add-adjustment", label: "Add Adjustment" }];

  const handleDropdownClick = ({ key, domEvent }) => {
    domEvent?.preventDefault();
    domEvent?.stopPropagation();
    if (key === "add-adjustment") setIsAddDrawerOpen(true);
  };

  const INVENTORY_QUANTITY_OPTIONS = inventoryQuantities.map((iq) => ({
    value: String(iq.id),
    label: `${iq.mi_item_id ?? "Item"} — On Hand: ${iq.quantity}`,
  }));

  const itemOptions = inventoryQuantities.map((iq) => ({
    id: iq.id,
    item_id: iq.mi_item_id,
  }));

  const data = histories.map((h) => ({
    ...h,
    created_at: new Date(h.created_at).toLocaleString(),
  }));

  return (
    <div className="p-5 space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Inventory History</h2>
          <p className="text-sm text-gray-500">
            Track and review all inventory adjustments
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <Table
          headers={headers}
          keys={keys}
          data={data}
          {...tableOptions}
          dropdownItems={dropdownItems}
          onItemClick={handleDropdownClick}
          onEditClick={handleViewClick}
          headerExtra={
            <div className="w-48">
              <FloatingSelect
                label="Select Item First"
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                options={[
                  { value: "", label: "Select Item" },
                  ...itemOptions.map((item) => ({
                    value: String(item.id),
                    label: item.item_id,
                  })),
                ]}
              />
            </div>
          }
        />
      </div>

      <Drawer
        isOpen={isAddDrawerOpen}
        onClose={closeAddDrawer}
        title="Add Inventory Adjustment"
        width={520}
      >
        <form
          className="flex flex-col h-full justify-between"
          onSubmit={handleSubmit}
        >
          {/* FORM BODY */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Adjustment Details</h3>
              <p className="text-sm text-gray-500">
                Select the inventory item and define the adjustment
              </p>
            </div>

            <div>
              <FloatingSelect
                label="Inventory Item"
                value={quantityId}
                onChange={(e) => setQuantityId(e.target.value)}
                options={INVENTORY_QUANTITY_OPTIONS}
              />
            </div>

            <div>
              <FloatingInput
                label="Quantity"
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FloatingSelect
                label="Operation"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                options={INVENTORY_OPERATIONS}
              />

              <FloatingSelect
                label="Method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                options={INVENTORY_METHODS}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between pt-6 mt-8 border-t">
            <button
              type="button"
              onClick={closeAddDrawer}
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
              Save Adjustment
            </button>
          </div>
        </form>
      </Drawer>

      <Drawer
        isOpen={isViewDrawerOpen}
        onClose={closeViewDrawer}
        title="Inventory Adjustment Details"
        width={680}
      >
        {viewHistory && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
              <FloatingInput
                label="Item ID"
                value={viewHistory.mi_item_id}
                disabled
              />
              <FloatingInput
                label="Description"
                value={viewHistory.mi_description}
                disabled
              />
              <FloatingInput
                label="Item Price"
                value={viewHistory.mi_item_price}
                disabled
              />
              <FloatingInput
                label="Quantity"
                value={viewHistory.qty}
                disabled
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FloatingInput label="Cost" value={viewHistory.cost} disabled />
              <FloatingInput
                label="Operation"
                value={viewHistory.operation}
                disabled
              />
              <FloatingInput
                label="Method"
                value={viewHistory.method}
                disabled
              />
              <FloatingInput
                label="Created By"
                value={viewHistory.created_by}
                disabled
              />
            </div>

            <FloatingInput
              label="Created At"
              value={new Date(viewHistory.created_at).toLocaleString()}
              disabled
            />
          </div>
        )}

        <div className="flex justify-end pt-6 border-t mt-8">
          <button
            type="button"
            onClick={closeViewDrawer}
            className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2"
          >
            <TbXboxXFilled />
            Close
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default InventoryHistory;
