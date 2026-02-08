import React, { useEffect, useState } from "react";
import Table from "../../../components/Tables";
import NormalModal from "../../../components/Modals/NormalModal";
import FloatingInput from "../../../components/Forms/FloatingInput";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../components/ActionsCenter/Alerts/Toast";

import SalesOrderAPI from "../../../api/private/sales_orders/salesOrderAPI";
import ReadOnlyField from "../../../components/Fields/ReadOnlyField";
import StatusBadge from "../../../components/Fields/StatusBadge";
import ApprovalButtons from "../../../components/Buttons/ApprovalButtons";
import ReadOnlyCard from "../../../components/Fields/ReadOnlyCard";
import UnpaidInvoicesModal from "./parts/UnpaidInvoicesModal";
import AccountsReceivableAPI from "../../../api/private/accounts_receivable/accountsReceivableAPI";

const SalesOrderApproval = () => {
  /* =====================
     TABLE CONFIG
  ===================== */
  const headers = [
    "SO No",
    "Customer",
    "Order Date",
    "Total",
    "Agent",
    "Status",
    "Actions",
  ];

  const keys = [
    "sales_order_id",
    "customer_name",
    "sales_order_date",
    "amount",
    "sales_rep",
    "status",
    "actions",
  ];

  const tableOptions = { withEdit: true, withDelete: false };

  /* =====================
     STATE
  ===================== */
  const [salesOrders, setSalesOrders] = useState([]);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedSO, setSelectedSO] = useState(null);
  const [unpaidCount, setUnpaidCount] = useState(0);

  const [openAR, setOpenAR] = useState(false);

  /* =====================
     LOAD PENDING SO
  ===================== */
  useEffect(() => {
    loadPendingSalesOrders();
  }, []);

  const loadPendingSalesOrders = async () => {
    try {
      const data = await SalesOrderAPI.loadSalesOrdersPending();
      setSalesOrders(data);
    } catch {
      showErrorToast("Failed to load pending sales orders");
    }
  };

  /* =====================
     VIEW DETAILS
  ===================== */
  const handleViewClick = async (row) => {
    try {
      const res = await SalesOrderAPI.getSalesOrders(row.id);
      const so = Array.isArray(res) ? res[0] : res;

      setSelectedSO(so);
      setIsViewOpen(true);

      // 🔔 LOAD UNPAID INVOICE COUNT
      const ar = await AccountsReceivableAPI.loadAccountsReceivableCustomer(
        so.so_customer_id,
      );

      const unpaid = (ar || []).filter((i) => i.payment_status === "UNPAID");

      setUnpaidCount(unpaid.length);
    } catch {
      showErrorToast("Failed to load sales order details");
    }
  };

  /* =====================
     APPROVE / REJECT
  ===================== */
  const handleAction = async (action) => {
    try {
      await SalesOrderAPI.actionSalesOrder(selectedSO.so_id, action);
      showSuccessToast(`Sales Order ${action} successfully`);
      setIsViewOpen(false);
      loadPendingSalesOrders();
    } catch (error) {
      const msg = error?.response?.data?.msg || error?.response?.data?.message;
      if (msg) return showWarningToast(msg);
      showErrorToast("Action failed");
    }
  };

  /* =====================
     TABLE DATA
  ===================== */
  const data = salesOrders.map((so) => ({
    id: so.id,
    sales_order_id: so.sales_order_id,
    customer_name: so.mcg_name,
    sales_rep: so.fullname,
    amount: so.total,
    sales_order_date: new Date(so.sales_order_date).toLocaleDateString(),
    status: so.process_status,
  }));

  return (
    <div className="p-5 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Sales Order Approval</h2>
        <p className="text-sm text-gray-500">
          Review and approve pending sales orders
        </p>
      </div>

      <Table
        headers={headers}
        keys={keys}
        data={data}
        {...tableOptions}
        onEditClick={handleViewClick}
      />

      {/* =====================
           VIEW MODAL
      ===================== */}
      <NormalModal
        open={isViewOpen}
        title="Sales Order Details"
        width={1000}
        hideCancel
        confirmText="Close"
        onConfirm={() => setIsViewOpen(false)}
      >
        {selectedSO && (
          <div className="space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Sales Order {selectedSO.so_sales_order_id}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Created by {selectedSO.so_create_by} •{" "}
                  {new Date(selectedSO.so_created_at).toLocaleString()}
                </p>
              </div>
              <StatusBadge status={selectedSO.so_process_status} />
            </div>

            {/* INFO CARDS */}
            <div className="grid grid-cols-4 gap-4">
              <ReadOnlyCard
                label="Customer"
                value={selectedSO.so_customer_name}
              />
              <ReadOnlyCard label="Sales Rep" value={selectedSO.so_sales_rep} />
              <ReadOnlyCard
                label="Order Date"
                value={new Date(
                  selectedSO.so_sales_order_date,
                ).toLocaleDateString()}
              />
              <ReadOnlyCard
                label="Shipping Date"
                value={new Date(
                  selectedSO.so_shipping_date,
                ).toLocaleDateString()}
              />
            </div>

            {/* ADDRESSES */}
            <div className="grid grid-cols-2 gap-4">
              <ReadOnlyCard
                label="Bill To Address"
                value={selectedSO.so_bill_to_address}
              />
              <ReadOnlyCard
                label="Ship To Address"
                value={selectedSO.so_ship_to_address}
              />
            </div>

            {/* ITEMS */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Item</th>
                    <th className="p-3 text-right">Qty</th>
                    <th className="p-3 text-center">UOM</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSO.items.map((item, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium">{item.description}</td>
                      <td className="p-3 text-right">{item.quantity}</td>
                      <td className="p-3 text-center">{item.oum}</td>
                      <td className="p-3 text-right">
                        ₱{Number(item.unit_price).toFixed(2)}
                      </td>
                      <td className="p-3 text-right font-semibold">
                        ₱{Number(item.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FINANCIAL SUMMARY */}
            <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
              <ReadOnlyCard
                label="Sales Tax"
                value={`₱${Number(selectedSO.so_sales_tax).toFixed(2)}`}
              />
              <ReadOnlyCard
                label="Freight"
                value={`₱${Number(selectedSO.so_freight).toFixed(2)}`}
              />
              <ReadOnlyCard
                label="Total"
                value={`₱${Number(selectedSO.so_total).toFixed(2)}`}
              />
              <ReadOnlyCard
                label="Net Due"
                value={`₱${Number(selectedSO.so_net_due).toFixed(2)}`}
              />
            </div>

            {/* APPROVAL */}
            <div className="flex justify-between items-center pt-4 border-t">
              {/* LEFT SIDE — EXTRA ACTION */}
              <button
                className="relative px-4 py-2 border rounded text-sm
                hover:bg-gray-100 transition"
                onClick={() => setOpenAR(true)}
              >
                View Unpaid Invoices
                {unpaidCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2
                    bg-red-600 text-white text-xs
                    font-semibold rounded-full
                    h-5 min-w-[20px] px-1
                    flex items-center justify-center"
                  >
                    {unpaidCount}
                  </span>
                )}
              </button>

              {/* RIGHT SIDE — EXISTING BUTTONS */}
              <ApprovalButtons
                status={selectedSO.so_process_status}
                onApprove={() => handleAction("APPROVED")}
                onReject={() => handleAction("REJECTED")}
              />
            </div>
          </div>
        )}
      </NormalModal>

      <UnpaidInvoicesModal
        open={openAR}
        onClose={() => setOpenAR(false)}
        customerId={selectedSO?.so_customer_id}
      />
    </div>
  );
};

export default SalesOrderApproval;
