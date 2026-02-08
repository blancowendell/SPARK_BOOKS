import React, { useEffect, useMemo, useState } from "react";
import NormalModal from "../../../../components/Modals/NormalModal";
import { showErrorToast } from "../../../../components/ActionsCenter/Alerts/Toast";

import AccountsReceivableAPI from "../../../../api/private/accounts_receivable/accountsReceivableAPI";

const UnpaidInvoicesModal = ({ open, onClose, customerId }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && customerId) loadData();
  }, [open, customerId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data =
        await AccountsReceivableAPI.loadAccountsReceivableCustomer(customerId);
      setRows(data || []);
    } catch {
      showErrorToast("Failed to load unpaid invoices");
    } finally {
      setLoading(false);
    }
  };

  const invoices = useMemo(() => {
    return rows.map((r) => {
      const amountDue = Number(r.amount_due || 0);
      const amountPaid = Number(r.amount_paid || 0);
      const balance = amountDue - amountPaid;

      return {
        customer_id: r.customer_id,
        invoice_no: r.si_invoice_no,
        date: new Date(r.created_at).toLocaleDateString(),
        status: r.payment_status,
        amountDue,
        amountPaid,
        balance,
        method: r.payment_method,
      };
    });
  }, [rows]);

  const totalBalance = invoices.reduce((sum, i) => sum + i.balance, 0);

  return (
    <NormalModal
      open={open}
      title={`Outstanding Invoices — ${customerId}`}
      width={900}
      hideCancel
      confirmText="Close"
      onConfirm={onClose}
    >
      <div className="space-y-5">
        {/* SUMMARY */}
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
          <div>
            <p className="text-sm text-gray-500">Total Outstanding Balance</p>
            <p className="text-2xl font-semibold text-red-600">
              ₱{totalBalance.toFixed(2)}
            </p>
          </div>
          <span className="text-sm text-gray-500">
            {invoices.length} unpaid invoice(s)
          </span>
        </div>

        {/* INVOICE BREAKDOWN */}
        {loading ? (
          <p className="text-center text-gray-500">Loading invoices...</p>
        ) : invoices.length === 0 ? (
          <p className="text-center text-gray-500">No unpaid invoices found.</p>
        ) : (
          <div className="space-y-3">
            {invoices.map((inv, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">
                      Invoice {inv.invoice_no}
                    </h4>
                    <p className="text-sm text-gray-500">Date: {inv.date}</p>
                    <p className="text-sm text-gray-500">
                      Payment Method: {inv.method || "—"}
                    </p>
                  </div>

                  <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                    {inv.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500">Invoice Total</p>
                    <p className="font-medium">₱{inv.amountDue.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Amount Paid</p>
                    <p className="font-medium">₱{inv.amountPaid.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Balance</p>
                    <p className="font-semibold text-red-600">
                      ₱{inv.balance.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </NormalModal>
  );
};

export default UnpaidInvoicesModal;
