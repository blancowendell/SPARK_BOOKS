import React, { useEffect, useState } from "react";
import FloatingInput from "../../../components/Forms/FloatingInput";
import Table from "../../../components/Tables";
import NormalModal from "../../../components/Modals/NormalModal";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../components/ActionsCenter/Alerts/Toast";
import InvoiceAPI from "../../../api/private/invoice/invoiceAPI";
import { TbXboxXFilled } from "react-icons/tb";
import { LuSaveAll } from "react-icons/lu";
import CustomerAPI from "../../../api/private/customer/customerAPI";
import InventoryQuantityAPI from "../../../api/private/inventory/inventoryQuantityAPI";
import EmployeeAPI from "../../../api/private/employee/employeeAPI";
import PricingAPI from "../../../api/private/maintain/pricingAPI";
import FloatingSelect from "../../../components/Forms/FloatingSelect";
import FloatingDatePicker from "../../../components/Forms/FloatingDatePicker";
import { TbMinus, TbPlus } from "react-icons/tb";

import LineItemsTable from "./parts/InvoiceModal/LineItemsTable";
import InvoiceTotals from "./parts/InvoiceModal/InvoiceTotals";
import CustomerDetails from "./parts/InvoiceModal/CustomerDetails";
import SalesOrderAPI from "../../../api/private/sales_orders/salesOrderAPI";

const EMPTY_LINE_ITEM = {
  item_id: "",
  quantity: 1,
  oum: "",
  item_description: "",
  base_price: 0,
  unit_price: 0,
  amount: 0,
  pricing_formula_id: "",
};

const Invoice = () => {
  const headers = [
    "Invoice No",
    "Customer",
    "Invoice Date",
    "Due Date",
    "Total",
    "Net Due",
    "Actions",
  ];

  const keys = [
    "invoice_no",
    "name",
    "invoice_date",
    "due_date",
    "amount",
    "create_by",
    "actions",
  ];

  const tableOptions = { withEdit: true, withDelete: false, withImage: true };

  const [invoices, setInvoices] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isSOOpen, setIsSOOpen] = useState(false); // ✅ REQUIRED
  const [viewInvoice, setViewInvoice] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pricingFormulas, setPricingFormulas] = useState([]);
  const [lineItems, setLineItems] = useState([{ ...EMPTY_LINE_ITEM }]);

  const [salesOrders, setSalesOrders] = useState([]);
  const [selectedSOId, setSelectedSOId] = useState("");

  const [form, setForm] = useState({
    salesOrderId: "",
    invoiceNo: "",
    customerId: "",
    salesRepId: "",
    billToAddress: "",
    billToName: "",
    shipToAddress: "",
    shipToName: "",
    invoiceDate: "",
    dueDate: "",
    shippingDate: "",
    salesTax: "",
    freight: "",
    invoiceTotal: "",
    netDue: "",
  });

  useEffect(() => {
    if (isAddOpen) {
      loadCustomers();
      loadInventory();
      loadEmployees();
    }
  }, [isAddOpen]);

  useEffect(() => {
    if (isSOOpen) {
      SalesOrderAPI.loadSalesOrdersApproved().then(setSalesOrders);
      loadCustomers();
      loadInventory();
      loadEmployees();
    }
  }, [isSOOpen]);

  useEffect(() => {
    addLineItem();
    loadPricingFormulas();
  }, []);

  const loadPricingFormulas = async () => {
    const data = await PricingAPI.loadPricingFormula();
    setPricingFormulas(data);
  };
  const loadEmployees = async () => {
    const data = await EmployeeAPI.loadEmployees();
    setEmployees(data);
  };

  const loadCustomers = async () => {
    const data = await CustomerAPI.loadCustomerGeneral();
    setCustomers(data);
  };

  const loadInventory = async () => {
    const data = await InventoryQuantityAPI.loadInventoryQuantity();
    setInventoryItems(data);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const data = await InvoiceAPI.loadInvoice();
      setInvoices(data);
    } catch {
      showErrorToast("Failed to load invoices");
    }
  };

  const handleCustomerSelect = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return;

    const billingAddress =
      customer.billing_address ||
      [
        customer.baranggay_street,
        customer.city,
        customer.province,
        customer.region,
        customer.country,
        customer.zip_code,
      ]
        .filter(Boolean)
        .join(", ");

    setForm((prev) => ({
      ...prev,
      customerId: customer.id,
      salesRepId: customer.sales_rep_id || "",
      billToName: customer.name,
      billToAddress: billingAddress,
      shipToName: customer.name,
      shipToAddress: billingAddress,
    }));
  };

  const handleItemChange = (index, inventoryId) => {
    const item = inventoryItems.find((i) => String(i.id) === inventoryId);
    if (!item) return;

    const updated = [...lineItems];
    updated[index] = {
      ...updated[index],
      item_id: item.inventory_id,
      oum: item.mi_stocking_uom,
      item_description: item.mi_description,
      base_price: Number(item.mi_item_price), // 🔥 NEW
      unit_price: Number(item.mi_item_price),
      quantity: 1,
      amount: Number(item.mi_item_price),
      pricing_formula_id: "",
    };

    setLineItems(updated);
  };

  const handlePricingFormulaChange = (index, formulaId) => {
    const formula = pricingFormulas.find(
      (f) => String(f.id) === String(formulaId),
    );
    if (!formula) return;

    const updated = [...lineItems];
    const item = updated[index];

    const basePrice = Number(item.base_price) || 0;
    const value = Number(formula.value) || 0;

    let newUnitPrice = basePrice;

    if (formula.pricing_type === "PERCENT") {
      const delta = basePrice * (value / 100);
      newUnitPrice =
        formula.operation === "DECREASE"
          ? basePrice - delta
          : basePrice + delta;
    }

    if (formula.pricing_type === "FIXED") {
      newUnitPrice =
        formula.operation === "DECREASE"
          ? basePrice - value
          : basePrice + value;
    }

    updated[index] = {
      ...item,
      pricing_formula_id: formula.id,
      unit_price: Number(newUnitPrice.toFixed(2)),
      amount: Number((newUnitPrice * item.quantity).toFixed(2)),
    };

    setLineItems(updated);
  };

  const handleQtyChange = (index, qty) => {
    const updated = [...lineItems];
    updated[index].quantity = qty;
    updated[index].amount = qty * updated[index].unit_price;
    setLineItems(updated);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await InvoiceAPI.addInvoice(
        form.salesOrderId,
        form.invoiceNo,
        form.customerId,
        form.salesRepId,
        form.billToAddress,
        form.billToName,
        form.shipToAddress,
        form.shipToName,
        form.invoiceDate,
        form.dueDate,
        form.shippingDate,
        Number(form.salesTax || 0),
        Number(form.freight || 0),
        Number(form.invoiceTotal),
        Number(form.netDue),
        lineItems, // ✅ itemDetails
      );

      showSuccessToast("Invoice successfully created");
      fetchInvoices();
      setIsAddOpen(false);
      setIsSOOpen(false);
    } catch (error) {
      console.error(error);

      // ✅ THIS IS THE IMPORTANT PART
      const backendMsg =
        error?.response?.data?.msg || error?.response?.data?.message;

      if (backendMsg) {
        return showWarningToast(backendMsg);
      }

      showErrorToast("Error Adding Sales Invoice");
    }
  };

  const handleSalesOrderSelect = async (soId) => {
    try {
      const data = await SalesOrderAPI.getSalesOrders(soId);
      if (!data || !data.length) return;

      const so = data[0];

      // HEADER
      setForm((prev) => ({
        ...prev,
        salesOrderId: so.so_id,
        customerId: so.so_customer_id,
        salesRepId: so.so_sales_rep_id,
        billToName: so.so_bill_to_name,
        billToAddress: so.so_bill_to_address,
        shipToName: so.so_ship_to_name,
        shipToAddress: so.so_ship_to_address,
        invoiceDate: new Date().toISOString().slice(0, 10),
        dueDate: so.so_sales_order_date,
        shippingDate: so.so_shipping_date,
        salesTax: so.so_sales_tax,
        freight: so.so_freight,
      }));

      // LINE ITEMS
      setLineItems(
        so.items.map((i) => ({
          item_id: i.item_id,
          quantity: Number(i.quantity),
          oum: i.oum,
          item_description: i.description,
          base_price: Number(i.unit_price),
          unit_price: Number(i.unit_price),
          amount: Number(i.amount),
          pricing_formula_id: "",
        })),
      );
    } catch (e) {
      showErrorToast("Failed to load Sales Order");
    }
  };

  const handleViewClick = async (row) => {
    try {
      const data = await InvoiceAPI.getInvoice(row.id);
      setViewInvoice(data[0]);
      setIsViewOpen(true);
    } catch {
      showErrorToast("Failed to load invoice details");
    }
  };

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        item_id: "",
        quantity: 1,
        oum: "",
        item_description: "",
        unit_price: 0,
        amount: 0,
      },
    ]);
  };

  const removeLineItem = (index) => {
    setLineItems((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );
  };

  const itemsSubtotal = lineItems.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  // user-entered sales tax (%)
  const extraSalesTaxRate = Number(form.salesTax || 0) / 100;

  // fixed VAT (12%)
  const VAT_RATE = 0.12;

  const extraSalesTaxAmount = itemsSubtotal * extraSalesTaxRate;
  const vatAmount = itemsSubtotal * VAT_RATE;

  const invoiceTotal = itemsSubtotal + extraSalesTaxAmount + vatAmount;
  const netDue = invoiceTotal + Number(form.freight || 0);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      invoiceTotal: invoiceTotal.toFixed(2),
      netDue: netDue.toFixed(2),
    }));
  }, [invoiceTotal, netDue]);

  const data = invoices.map((i) => ({
    id: i.id,
    invoice_no: i.invoice_no,
    name: i.mcg_name,
    invoice_date: new Date(i.invoice_date).toLocaleDateString(),
    due_date: new Date(i.due_date).toLocaleDateString(),
    amount: i.invoice_total,
    create_by: i.create_by,
  }));

  return (
    <div className="p-5 space-y-3">
      <div>
        {" "}
        <h2 className="text-2xl font-semibold">Sales Invoices</h2>{" "}
        <p className="text-sm text-gray-500">
          {" "}
          Manage and review all sales invoices{" "}
        </p>{" "}
      </div>
      <Table
        headers={headers}
        keys={keys}
        data={data}
        {...tableOptions}
        dropdownItems={[
          { key: "add", label: "Add Invoice" },
          { key: "add-so", label: "SO Invoice" },
        ]}
        onItemClick={(item) => {
          if (item.key === "add") setIsAddOpen(true);
          if (item.key === "add-so") setIsSOOpen(true);
        }}
        onEditClick={handleViewClick}
      />

      {/* ADD INVOICE */}
      {/* <NormalModal
        open={isAddOpen}
        title="Invoice"
        width={1500}
        onCancel={() => setIsAddOpen(false)}
        onConfirm={handleSubmit}
        confirmText="Save Invoice"
      >
        <div className="space-y-4">
          <CustomerDetails
            form={form}
            customers={customers}
            employees={employees}
            onCustomerSelect={handleCustomerSelect}
            onChange={handleChange}
            setForm={setForm}
          />

          <LineItemsTable
            lineItems={lineItems}
            inventoryItems={inventoryItems}
            pricingFormulas={pricingFormulas}
            onAdd={addLineItem}
            onRemove={removeLineItem}
            onQtyChange={handleQtyChange}
            onItemChange={handleItemChange}
            onPricingFormulaChange={handlePricingFormulaChange}
          />

          <InvoiceTotals form={form} onChange={handleChange} vatAmount={vatAmount}
          />
        </div>
      </NormalModal> */}
      <NormalModal
        open={isSOOpen}
        title="SO Invoice"
        width={1500}
        onCancel={() => setIsSOOpen(false)}
        onConfirm={handleSubmit}
        confirmText="Save Invoice"
      >
        <div className="space-y-4">
          {/* SALES ORDER SELECT */}
          <FloatingSelect
            label="Sales Order"
            value={selectedSOId} // ✅ CONTROLLED
            options={[
              { value: "", label: "Select Sales Order" },
              ...salesOrders.map((so) => ({
                value: so.id,
                label: so.sales_order_id,
              })),
            ]}
            onChange={(e) => {
              const soId = e.target.value;
              setSelectedSOId(soId); // ✅ persist value
              handleSalesOrderSelect(soId);
            }}
          />

          {/* REUSE EXISTING UI */}
          {/* <CustomerDetails
            form={form}
            customers={customers}
            employees={employees}
            onCustomerSelect={() => {}} // disabled
            onChange={() => {}}
            setForm={setForm}
          />

          <LineItemsTable
            lineItems={lineItems}
            inventoryItems={inventoryItems}
            pricingFormulas={pricingFormulas}
            onAdd={() => {}}
            onRemove={() => {}}
            onQtyChange={() => {}}
            onItemChange={() => {}}
            onPricingFormulaChange={() => {}}
          /> */}

          <CustomerDetails
            form={form}
            customers={customers}
            employees={employees}
            onCustomerSelect={handleCustomerSelect}
            onChange={handleChange}
            setForm={setForm}
          />

          <LineItemsTable
            lineItems={lineItems}
            inventoryItems={inventoryItems}
            pricingFormulas={pricingFormulas}
            onAdd={addLineItem}
            onRemove={removeLineItem}
            onQtyChange={handleQtyChange}
            onItemChange={handleItemChange}
            onPricingFormulaChange={handlePricingFormulaChange}
          />

          <InvoiceTotals
            form={form}
            onChange={handleChange}
            vatAmount={vatAmount}
          />
        </div>
      </NormalModal>

      {/* VIEW INVOICE */}
      <NormalModal
        open={isViewOpen}
        title="Invoice Details"
        width={700}
        hideCancel
        confirmText="Close"
        onConfirm={() => setIsViewOpen(false)}
      >
        {viewInvoice && (
          <div className="grid grid-cols-2 gap-4">
            <FloatingInput
              label="Invoice No"
              value={viewInvoice.invoice_no}
              disabled
            />
            <FloatingInput
              label="Customer"
              value={viewInvoice.customer_name}
              disabled
            />
            <FloatingInput
              label="Invoice Date"
              value={viewInvoice.invoice_date}
              disabled
            />
            <FloatingInput
              label="Due Date"
              value={viewInvoice.due_date}
              disabled
            />
            <FloatingInput
              label="Invoice Total"
              value={viewInvoice.invoice_total}
              disabled
            />
            <FloatingInput
              label="Net Due"
              value={viewInvoice.net_due}
              disabled
            />
          </div>
        )}
      </NormalModal>
    </div>
  );
};

export default Invoice;
