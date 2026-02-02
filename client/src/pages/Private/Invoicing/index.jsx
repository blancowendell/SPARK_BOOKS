// import React, { useEffect, useState } from "react";
// import FloatingInput from "../../../components/Forms/FloatingInput";
// import Table from "../../../components/Tables";
// import NormalModal from "../../../components/Modals/NormalModal";
// import {
//   showErrorToast,
//   showSuccessToast,
//   showWarningToast,
// } from "../../../components/ActionsCenter/Alerts/Toast";
// import InvoiceAPI from "../../../api/private/invoice/invoiceAPI";
// import { TbXboxXFilled } from "react-icons/tb";
// import { LuSaveAll } from "react-icons/lu";
// import CustomerAPI from "../../../api/private/customer/customerAPI";
// import InventoryQuantityAPI from "../../../api/private/inventory/inventoryQuantityAPI";
// import EmployeeAPI from "../../../api/private/employee/employeeAPI";
// import FloatingSelect from "../../../components/Forms/FloatingSelect";
// import FloatingDatePicker from "../../../components/Forms/FloatingDatePicker";
// import { TbMinus, TbPlus } from "react-icons/tb";

// const Invoice = () => {
//   const headers = [
//     "Invoice No",
//     "Customer",
//     "Invoice Date",
//     "Due Date",
//     "Total",
//     "Net Due",
//     "Actions",
//   ];

//   const keys = [
//     "invoice_no",
//     "customer_name",
//     "invoice_date",
//     "due_date",
//     "invoice_total",
//     "net_due",
//     "actions",
//   ];

//   const tableOptions = { withEdit: true, withDelete: false };

//   const [invoices, setInvoices] = useState([]);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [isViewOpen, setIsViewOpen] = useState(false);
//   const [viewInvoice, setViewInvoice] = useState(null);

//   const [customers, setCustomers] = useState([]);
//   const [inventoryItems, setInventoryItems] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   const [lineItems, setLineItems] = useState([
//     {
//       item_id: "",
//       quantity: 1,
//       oum: "",
//       item_description: "",
//       unit_price: 0,
//       amount: 0,
//     },
//   ]);

//   const [form, setForm] = useState({
//     invoiceNo: "",
//     customerId: "",
//     salesRepId: "",
//     billToAddress: "",
//     billToName: "",
//     shipToAddress: "",
//     shipToName: "",
//     invoiceDate: "",
//     dueDate: "",
//     shippingDate: "",
//     salesTax: "",
//     freight: "",
//     invoiceTotal: "",
//     netDue: "",
//   });

//   useEffect(() => {
//     if (isAddOpen) {
//       loadCustomers();
//       loadInventory();
//       loadEmployees();
//     }
//   }, [isAddOpen]);

//   useEffect(() => {
//     addLineItem();
//   }, []);

//   const loadEmployees = async () => {
//     const data = await EmployeeAPI.loadEmployees();
//     setEmployees(data);
//   };

//   const loadCustomers = async () => {
//     const data = await CustomerAPI.loadCustomerGeneral();
//     setCustomers(data);
//   };

//   const loadInventory = async () => {
//     const data = await InventoryQuantityAPI.loadInventoryQuantity();
//     setInventoryItems(data);
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   const fetchInvoices = async () => {
//     try {
//       const data = await InvoiceAPI.loadInvoice();
//       setInvoices(data);
//     } catch {
//       showErrorToast("Failed to load invoices");
//     }
//   };

//   const handleCustomerSelect = (customerId) => {
//     const customer = customers.find((c) => c.id === customerId);
//     if (!customer) return;

//     const billingAddress =
//       customer.billing_address ||
//       [
//         customer.baranggay_street,
//         customer.city,
//         customer.province,
//         customer.region,
//         customer.country,
//         customer.zip_code,
//       ]
//         .filter(Boolean)
//         .join(", ");

//     setForm((prev) => ({
//       ...prev,
//       customerId: customer.id,
//       salesRepId: customer.sales_rep_id || "", // 👈 AUTO SET
//       billToName: customer.name,
//       billToAddress: billingAddress,
//       shipToName: customer.name,
//       shipToAddress: billingAddress,
//     }));
//   };

//   const handleItemChange = (index, inventoryId) => {
//     const item = inventoryItems.find((i) => String(i.id) === inventoryId);
//     if (!item) return;

//     const updated = [...lineItems];
//     updated[index] = {
//       ...updated[index],
//       item_id: item.inventory_id,
//       oum: item.mi_stocking_uom,
//       item_description: item.mi_description,
//       unit_price: item.mi_item_price,
//       quantity: 1,
//       amount: item.mi_item_price,
//     };

//     setLineItems(updated);
//   };

//   const handleQtyChange = (index, qty) => {
//     const updated = [...lineItems];
//     updated[index].quantity = qty;
//     updated[index].amount = qty * updated[index].unit_price;
//     setLineItems(updated);
//   };

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     try {
//       await InvoiceAPI.addInvoice(
//         form.invoiceNo,
//         form.customerId,
//         form.salesRepId,
//         form.billToAddress,
//         form.billToName,
//         form.shipToAddress,
//         form.shipToName,
//         form.invoiceDate,
//         form.dueDate,
//         form.shippingDate,
//         Number(form.salesTax || 0),
//         Number(form.freight || 0),
//         Number(form.invoiceTotal),
//         Number(form.netDue),
//         lineItems, // ✅ itemDetails
//       );

//       showSuccessToast("Invoice successfully created");
//       fetchInvoices();
//       setIsAddOpen(false);
//     } catch (e) {
//       showErrorToast("Failed to create invoice");
//     }
//   };

//   const handleViewClick = async (row) => {
//     try {
//       const data = await InvoiceAPI.getInvoice(row.id);
//       setViewInvoice(data[0]);
//       setIsViewOpen(true);
//     } catch {
//       showErrorToast("Failed to load invoice details");
//     }
//   };

//   const addLineItem = () => {
//     setLineItems((prev) => [
//       ...prev,
//       {
//         item_id: "",
//         quantity: 1,
//         oum: "",
//         item_description: "",
//         unit_price: 0,
//         amount: 0,
//       },
//     ]);
//   };

//   const removeLineItem = (index) => {
//     setLineItems((prev) =>
//       prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
//     );
//   };

//   const itemsSubtotal = lineItems.reduce(
//     (sum, item) => sum + Number(item.amount || 0),
//     0,
//   );

//   const salesTaxAmount = itemsSubtotal * (Number(form.salesTax || 0) / 100);

//   const invoiceTotal = itemsSubtotal + salesTaxAmount;
//   const netDue = invoiceTotal + Number(form.freight || 0);

//   // 2️⃣ SYNC TOTALS INTO FORM
//   useEffect(() => {
//     setForm((prev) => ({
//       ...prev,
//       invoiceTotal: invoiceTotal.toFixed(2),
//       netDue: netDue.toFixed(2),
//     }));
//   }, [invoiceTotal, netDue]);

//   const data = invoices.map((i) => ({
//     id: i.id,
//     invoice_no: i.invoice_no,
//     customer_name: i.customer_name,
//     invoice_date: new Date(i.invoice_date).toLocaleDateString(),
//     due_date: new Date(i.due_date).toLocaleDateString(),
//     invoice_total: i.invoice_total,
//     net_due: i.net_due,
//   }));

//   return (
//     <div className="p-5 space-y-3">
//       <div>
//         {" "}
//         <h2 className="text-2xl font-semibold">Sales Invoices</h2>{" "}
//         <p className="text-sm text-gray-500">
//           {" "}
//           Manage and review all sales invoices{" "}
//         </p>{" "}
//       </div>
//       <Table
//         headers={headers}
//         keys={keys}
//         data={data}
//         {...tableOptions}
//         dropdownItems={[{ key: "add", label: "Add Invoice" }]}
//         onItemClick={() => setIsAddOpen(true)}
//         onEditClick={handleViewClick}
//       />

//       {/* ADD INVOICE */}
//       <NormalModal
//         open={isAddOpen}
//         title="Invoice"
//         width={1500}
//         onCancel={() => setIsAddOpen(false)}
//         onConfirm={handleSubmit}
//         confirmText="Save Invoice"
//       >
//         <div className="space-y-4">
//           {/* HEADER */}
//           <div className="grid grid-cols-4 gap-4">
//             <FloatingSelect
//               label="Customer"
//               value={form.customerId}
//               onChange={(e) => handleCustomerSelect(e.target.value)}
//               options={[
//                 { value: "", label: "Select Customer" },
//                 ...customers.map((c) => ({
//                   value: String(c.id),
//                   label: `${c.id} (${c.name})`,
//                 })),
//               ]}
//             />

//             <FloatingInput
//               label="Invoice No"
//               value={form.invoiceNo}
//               onChange={(e) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   invoiceNo: e?.target?.value ?? e ?? "",
//                 }))
//               }
//             />

//             <FloatingDatePicker
//               id="invoiceDate"
//               label="Invoice Date"
//               value={form.invoiceDate}
//               required
//               onChange={(date, dateString) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   invoiceDate: dateString,
//                 }))
//               }
//             />

//             <FloatingDatePicker
//               id="dueDate"
//               label="Due Date"
//               value={form.dueDate}
//               required
//               onChange={(date, dateString) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   dueDate: dateString,
//                 }))
//               }
//             />
//           </div>

//           {/* BILL / SHIP */}
//           <div className="grid grid-cols-2 gap-6">
//             <div className="border rounded p-3 space-y-2">
//               <h4 className="text-sm font-semibold">Bill To</h4>
//               <FloatingInput
//                 label="Name"
//                 name="billToName"
//                 value={form.billToName}
//                 onChange={handleChange}
//               />
//               <FloatingInput
//                 label="Address"
//                 name="billToAddress"
//                 value={form.billToAddress}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="border rounded p-3 space-y-2">
//               <h4 className="text-sm font-semibold">Ship To</h4>
//               <FloatingInput
//                 label="Name"
//                 name="shipToName"
//                 value={form.shipToName}
//                 onChange={handleChange}
//               />
//               <FloatingInput
//                 label="Address"
//                 name="shipToAddress"
//                 value={form.shipToAddress}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* SHIPPING / SALES */}
//           <div className="grid grid-cols-4 gap-4">
//             <FloatingInput label="Customer PO" />
//             <FloatingInput label="Ship Via" />
//             <FloatingSelect
//               label="Sales Rep"
//               value={form.salesRepId}
//               onChange={(e) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   salesRepId: e.target.value,
//                 }))
//               }
//               options={[
//                 { value: "", label: "Select Sales Rep" },
//                 ...employees.map((emp) => ({
//                   value: emp.id, // or emp.employee_id if that’s your PK
//                   label: emp.fullname || emp.name,
//                 })),
//               ]}
//             />
//             <FloatingDatePicker
//               id="shippingDate"
//               label="Ship Date"
//               value={form.shippingDate}
//               onChange={(date, dateString) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   shippingDate: dateString,
//                 }))
//               }
//             />
//           </div>

//           {/* LINE ITEMS */}
//           <div className="border rounded">
//             <table className="w-full text-sm border-collapse">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border p-2 w-10 text-center"></th>
//                   <th className="border p-2 w-20">Qty</th>
//                   <th className="border p-2 w-36">Item</th>
//                   <th className="border p-2 w-20">U/M</th>
//                   <th className="border p-2">Description</th>
//                   <th className="border p-2 w-32">Unit Price</th>
//                   <th className="border p-2 w-16">Tax</th>
//                   <th className="border p-2 w-32">Amount</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {lineItems.map((row, index) => (
//                   <tr key={index}>
//                     {/* REMOVE */}
//                     <td className="border p-1 text-center">
//                       <button
//                         type="button"
//                         onClick={() => removeLineItem(index)}
//                         disabled={lineItems.length === 1}
//                         className={`${
//                           lineItems.length === 1
//                             ? "text-gray-300 cursor-not-allowed"
//                             : "text-red-600 hover:text-red-800"
//                         }`}
//                       >
//                         <TbMinus />
//                       </button>
//                     </td>

//                     {/* QTY */}
//                     <td className="border p-1">
//                       <input
//                         type="number"
//                         min={1}
//                         className="w-full"
//                         value={row.quantity}
//                         onChange={(e) =>
//                           handleQtyChange(index, Number(e.target.value) || 1)
//                         }
//                       />
//                     </td>

//                     {/* ITEM */}
//                     <td className="border p-1">
//                       <select
//                         className="w-full"
//                         value={row.item_id}
//                         onChange={(e) =>
//                           handleItemChange(index, e.target.value)
//                         }
//                       >
//                         <option value="">Select Item</option>
//                         {inventoryItems.map((i) => (
//                           <option key={i.id} value={String(i.id)}>
//                             {i.mi_item_id}
//                           </option>
//                         ))}
//                       </select>
//                     </td>

//                     <td className="border p-1">{row.oum}</td>
//                     <td className="border p-1">{row.item_description}</td>
//                     <td className="border p-1 text-right">
//                       {row.unit_price.toFixed(2)}
//                     </td>
//                     <td className="border p-1 text-center">✓</td>
//                     <td className="border p-1 text-right">
//                       {row.amount.toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>

//               <tfoot>
//                 <tr>
//                   <td className="border p-2 text-center">
//                     <button
//                       type="button"
//                       onClick={addLineItem}
//                       className="text-green-600 hover:text-green-800"
//                     >
//                       <TbPlus />
//                     </button>
//                   </td>
//                   <td colSpan={7} className="border p-2"></td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>

//           {/* TOTALS */}
//           {/* TOTALS */}
//           <div className="flex justify-end">
//             <div className="w-80 space-y-2">
//               <FloatingInput
//                 label="Sales Tax (%)"
//                 name="salesTax"
//                 value={form.salesTax}
//                 onChange={handleChange}
//               />

//               <FloatingInput
//                 label="Freight"
//                 name="freight"
//                 value={form.freight}
//                 onChange={handleChange}
//               />

//               <FloatingInput
//                 label="Invoice Total"
//                 value={form.invoiceTotal}
//                 disabled
//               />

//               <FloatingInput label="Net Due" value={form.netDue} disabled />
//             </div>
//           </div>
//         </div>
//       </NormalModal>

//       {/* VIEW INVOICE */}
//       <NormalModal
//         open={isViewOpen}
//         title="Invoice Details"
//         width={700}
//         hideCancel
//         confirmText="Close"
//         onConfirm={() => setIsViewOpen(false)}
//       >
//         {viewInvoice && (
//           <div className="grid grid-cols-2 gap-4">
//             <FloatingInput
//               label="Invoice No"
//               value={viewInvoice.invoice_no}
//               disabled
//             />
//             <FloatingInput
//               label="Customer"
//               value={viewInvoice.customer_name}
//               disabled
//             />
//             <FloatingInput
//               label="Invoice Date"
//               value={viewInvoice.invoice_date}
//               disabled
//             />
//             <FloatingInput
//               label="Due Date"
//               value={viewInvoice.due_date}
//               disabled
//             />
//             <FloatingInput
//               label="Invoice Total"
//               value={viewInvoice.invoice_total}
//               disabled
//             />
//             <FloatingInput
//               label="Net Due"
//               value={viewInvoice.net_due}
//               disabled
//             />
//           </div>
//         )}
//       </NormalModal>
//     </div>
//   );
// };

// export default Invoice;

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

import CustomerDetails from "./parts/invoiceModal/CustomerDetails";
import LineItemsTable from "./parts/invoiceModal/LineItemsTable";
import InvoiceTotals from "./parts/invoiceModal/InvoiceTotals";

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
  const [viewInvoice, setViewInvoice] = useState(null);

  const [customers, setCustomers] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pricingFormulas, setPricingFormulas] = useState([]);
  const [lineItems, setLineItems] = useState([{ ...EMPTY_LINE_ITEM }]);

  // const [lineItems, setLineItems] = useState([
  //   {
  //     item_id: "",
  //     quantity: 1,
  //     oum: "",
  //     item_description: "",
  //     unit_price: 0,
  //     amount: 0,
  //   },
  // ]);

  const [form, setForm] = useState({
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
      salesRepId: customer.sales_rep_id || "", // 👈 AUTO SET
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
    } catch (error) {
      console.error(error);

      // ✅ THIS IS THE IMPORTANT PART
      const backendMsg =
        error?.response?.data?.msg || error?.response?.data?.message;

      if (backendMsg) {
        return showWarningToast(backendMsg);
      }

      showErrorToast(
        "Error Adding Sales Invoice"
      );
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
    0
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
        dropdownItems={[{ key: "add", label: "Add Invoice" }]}
        onItemClick={() => setIsAddOpen(true)}
        onEditClick={handleViewClick}
      />

      {/* ADD INVOICE */}
      <NormalModal
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
