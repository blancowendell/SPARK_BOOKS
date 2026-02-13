import React, { useEffect, useState } from "react";
import FloatingInput from "../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../components/Forms/FloatingSelect";
import Table from "../../../components/Tables";
import Drawer from "../../../components/Modals/AntdDrawer";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../components/ActionsCenter/Alerts/Toast";
import InventoryAPI from "../../../api/private/inventory/inventoryAPI";
import CoaAPI from "../../../api/private/chart_of_accounts/coaAPI";
import ToggleStatusButton from "../../../components/Buttons/ToggleStatus";

const Inventory = () => {
  const headers = [
    "Item ID",
    "Description",
    "Item Class",
    "Brand",
    "Location",
    "Qty On Hand",
    "Status",
    "Actions",
  ];

  const keys = [
    "itemId",
    "description",
    "itemClass",
    "brand",
    "location",
    "qtyOnHand",
    "status",
    "actions",
  ];

  const tableOptions = { withEdit: true, withDelete: false };

  const [inventories, setInventories] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingInventory, setEditingInventory] = useState(null);
  const [coaAccounts, setCoaAccounts] = useState([]);

  /* =======================
     FORM STATES
  ======================= */
  const [description, setDescription] = useState("");
  const [descriptionSalesPurchase, setDescriptionSalesPurchase] = useState("");
  const [itemClass, setItemClass] = useState("");
  const [glSalesAccount, setGlSalesAccount] = useState("");
  const [glInventoryAccount, setGlInventoryAccount] = useState("");
  const [glCogsAccount, setGlCogsAccount] = useState("");
  const [upcSku, setUpcSku] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [stockingUnit, setStockingUnit] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [itemPrice, setItemPrice] = useState("");

  const [qtyOnHand, setQtyOnHand] = useState(0);

  const STOCKING_UNIT_OPTIONS = [
    { value: "EA", label: "EA – Each" },
    { value: "KG", label: "KG – Kilogram" },
    { value: "LBS", label: "LBS – Pounds" },
    { value: "MTR", label: "MTR – Meter" },
    { value: "FT", label: "FT – Feet" },
    { value: "BOX", label: "BOX – Box" },
    { value: "PACK", label: "PACK – Pack" },
    { value: "SET", label: "SET – Set" },
    { value: "PC", label: "PC – Piece" },
  ];

  /* =======================
     INITIAL LOAD
  ======================= */
  useEffect(() => {
    fetchInventories();
    fetchCoa();
  }, []);

  useEffect(() => {
    if (editingInventory) {
      setDescription(editingInventory.description || "");
      setDescriptionSalesPurchase(
        editingInventory.description_sales_purchase || "",
      );
      setItemClass(editingInventory.item_class || "");
      setGlSalesAccount(editingInventory.gl_sales_account || "");
      setGlInventoryAccount(editingInventory.gl_inventory_account || "");
      setGlCogsAccount(editingInventory.gl_cogs_account || "");

      setItemPrice(editingInventory.item_price || "");
      setUpcSku(editingInventory.upc_sku || "");
      setItemType(editingInventory.item_type || "");
      setItemLocation(editingInventory.item_location || "");
      setStockingUnit(editingInventory.stocking_uom || "");
      setSize(editingInventory.size || "");
      setWeight(editingInventory.weight || "");
      setLocation(editingInventory.location || "");
      setBrand(editingInventory.brand || "");
      setStatus(editingInventory.status || "ACTIVE");
    }
  }, [editingInventory]);

  /* =======================
     API HANDLERS
  ======================= */
  const fetchInventories = async () => {
    try {
      const data = await InventoryAPI.loadMasterInventory();
      setInventories(data);
    } catch {
      showErrorToast("Failed to load inventory");
    }
  };

  const fetchCoa = async () => {
    try {
      const data = await CoaAPI.loadCoa();
      setCoaAccounts(data);
    } catch {
      showErrorToast("Failed to load Chart of Accounts");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingInventory) {
        response = await InventoryAPI.editMasterInventory(
          editingInventory.id,
          description,
          descriptionSalesPurchase,
          itemClass,
          glSalesAccount,
          glInventoryAccount,
          glCogsAccount,
          itemPrice,
          upcSku,
          itemType,
          itemLocation,
          stockingUnit,
          size,
          weight,
          location,
          brand,
          status,
        );
      } else {
        response = await InventoryAPI.addMasterInventory(
          description,
          descriptionSalesPurchase,
          itemClass,
          glSalesAccount,
          glInventoryAccount,
          glCogsAccount,
          itemPrice,
          upcSku,
          itemType,
          itemLocation,
          stockingUnit,
          size,
          weight,
          location,
          brand,
        );
      }

      if (response?.msg === "exist") {
        showWarningToast("Inventory item already exists!");
        return;
      }

      showSuccessToast(
        editingInventory
          ? "Inventory updated successfully!"
          : "Inventory added successfully!",
      );

      fetchInventories();
      closeDrawer();
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to save inventory");
    }
  };

  const handleEditClick = async (row) => {
    try {
      const [data] = await InventoryAPI.getMasterInventory(row.id);
      setEditingInventory(data);
      setQtyOnHand(data.iq_quantity ?? 0);
      setIsDrawerOpen(true);
    } catch {
      showErrorToast("Failed to load inventory details");
    }
  };

  /* =======================
     UI HELPERS
  ======================= */
  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingInventory(null);
    resetForm();
  };

  const resetForm = () => {
    setDescription("");
    setDescriptionSalesPurchase("");
    setItemClass("");
    setGlSalesAccount("");
    setGlInventoryAccount("");
    setGlCogsAccount("");
    setItemPrice("");
    setUpcSku("");
    setItemType("");
    setItemLocation("");
    setStockingUnit("");
    setSize("");
    setWeight("");
    setLocation("");
    setBrand("");
    setStatus("ACTIVE");

    setQtyOnHand(0);
  };

  const dropdownItems = [{ key: "add-new", label: "Add New Item" }];

  const handleDropdownClick = ({ key }) => {
    if (key === "add-new") openDrawer();
  };

  const data = inventories.map((inv) => ({
    id: inv.id,
    itemId: inv.item_id,
    description: inv.description,
    itemClass: inv.item_class,
    brand: inv.brand,
    location: inv.location,
    qtyOnHand: inv.iq_quantity,
    status: inv.status,
    ...inv,
  }));

  return (
    <div className="p-5 space-y-3">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Inventory List</h2>
          <p className="text-sm text-gray-500">
            Masters Data for Inventory
          </p>
        </div>
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
        title={
          <div className="flex justify-between items-center w-full">
            <span className="text-lg font-semibold">
              {editingInventory ? "Edit Inventory" : "Add Inventory"}
            </span>

            {editingInventory && (
              <span className="text-xl font-semibold text-gray-700">
                Qty on Hand:&nbsp;
                <span className="text-gray-900">
                  {Number(qtyOnHand).toFixed(2)}
                </span>
              </span>
            )}
          </div>
        }
        width={1000}
      >
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* ================= BASIC INFO ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <FloatingInput
                label="Item Cost"
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />

              <FloatingInput
                label="UPC / SKU"
                value={upcSku}
                onChange={(e) => setUpcSku(e.target.value)}
              />

              <FloatingInput
                label="Sales / Purchase Description"
                value={descriptionSalesPurchase}
                onChange={(e) => setDescriptionSalesPurchase(e.target.value)}
              />

              <FloatingInput
                label="Item Class"
                value={itemClass}
                onChange={(e) => setItemClass(e.target.value)}
              />

              <FloatingInput
                label="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />

              <FloatingInput
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ================= ACCOUNTING ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Accounting Setup</h3>

            <div className="grid grid-cols-3 gap-4">
              <FloatingSelect
                id="glSalesAccount"
                label="GL Sales Account"
                value={glSalesAccount}
                onChange={(e) => setGlSalesAccount(e.target.value)}
                options={coaAccounts.map((coa) => ({
                  value: String(coa.id),
                  label: `${coa.account_code} - ${coa.description}`,
                }))}
              />

              <FloatingSelect
                id="glInventoryAccount"
                label="GL Inventory Account"
                value={glInventoryAccount}
                onChange={(e) => setGlInventoryAccount(e.target.value)}
                options={coaAccounts.map((coa) => ({
                  value: String(coa.id),
                  label: `${coa.account_code} - ${coa.description}`,
                }))}
              />

              <FloatingSelect
                id="glCogsAccount"
                label="GL COGS Account"
                value={glCogsAccount}
                onChange={(e) => setGlCogsAccount(e.target.value)}
                options={coaAccounts.map((coa) => ({
                  value: String(coa.id),
                  label: `${coa.account_code} - ${coa.description}`,
                }))}
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ================= ITEM DETAILS ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Item Details</h3>

            <div className="grid grid-cols-3 gap-4">
              <FloatingInput
                label="Item Type"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
              />

              <FloatingInput
                label="Item Location"
                value={itemLocation}
                onChange={(e) => setItemLocation(e.target.value)}
              />

              <FloatingSelect
                id="mi_stocking_uom"
                label="Stocking Unit"
                value={stockingUnit}
                onChange={(e) => setStockingUnit(e.target.value)}
                options={STOCKING_UNIT_OPTIONS}
              />

              <FloatingInput
                label="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />

              <FloatingInput
                label="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* ================= STATUS ================= */}
          {editingInventory && (
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
              {editingInventory ? "Update" : "Add"} Item
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default Inventory;
