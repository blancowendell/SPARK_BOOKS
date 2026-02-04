import React, { useEffect, useState } from "react";
import FloatingInput from "../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../components/Forms/FloatingSelect";
import FloatingNumberInput from "../../../components/Forms/FloatingNumberInput";
import Table from "../../../components/Tables";
import { LuSaveAll } from "react-icons/lu";

import AccountsReceivableAPI from "../../../api/private/accounts_receivable/accountsReceivableAPI";
import AccountsPaymentsAPI from "../../../api/private/accounts_receivable/accountsPaymentsAPI";
import CoaAPI from "../../../api/private/chart_of_accounts/coaAPI";
import CustomerAPI from "../../../api/private/customer/customerAPI";
import VendorAPI from "../../../api/private/customer/customerAPI";

import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../../components/ActionsCenter/Alerts/Toast";
import FloatingDatePicker from "../../../components/Forms/FloatingDatePicker";
import FloatingCurrencyInput from "../../../components/Forms/FloatingCurrencyInput";

const ReceiveCustomerPayment = ({ customer }) => {
  const [coaList, setCoaList] = useState([]);
  const [coaId, setCoaId] = useState("");

  const [receiptNo, setReceiptNo] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [receiptAmount, setReceiptAmount] = useState(0);
  const [paymentMethod] = useState("CASH");

  const [invoices, setInvoices] = useState([]);
  const [accountType, setAccountType] = useState("Customer");

  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [vendorId, setVendorId] = useState("");

  /* =======================
     LOAD DATA
  ======================= */
  useEffect(() => {
    if (customer?.id) {
      loadInvoices(customer.id);
    }
    loadCoa();
  }, [customer]);

  useEffect(() => {
    if (accountType === "Customer") {
      loadCustomers();
      setVendorId("");
      setInvoices([]);
    } else {
      loadVendors();
      setCustomerId("");
      setInvoices([]);
    }
  }, [accountType]);

  const loadVendorInvoices = async (vendorId) => {
    try {
      const data =
        await AccountsReceivableAPI.loadAccountsReceivableVendors(vendorId);

      setInvoices(
        data.map((inv) => ({
          ...inv,
          selected: false,
          appliedAmount: 0,
        })),
      );
    } catch {
      showErrorToast("Failed to load vendor payables");
    }
  };

  useEffect(() => {
    if (accountType === "Customer" && customerId) {
      loadInvoices(customerId);
    }

    if (accountType === "Vendor" && vendorId) {
      loadVendorInvoices(vendorId);
    }
  }, [customerId, vendorId]);

  const loadCustomers = async () => {
    try {
      const data = await CustomerAPI.loadCustomerGeneral();
      setCustomers(data);
    } catch {
      showErrorToast("Failed to load customers");
    }
  };

  const loadVendors = async () => {
    try {
      const data = await VendorAPI.loadVendorGeneral();
      setVendors(data);
    } catch {
      showErrorToast("Failed to load vendors");
    }
  };

  const loadInvoices = async (customerId) => {
    try {
      const data =
        await AccountsReceivableAPI.loadAccountsReceivableCustomer(customerId);

      setInvoices(
        data.map((inv) => ({
          ...inv,
          selected: false,
          appliedAmount: 0,
        })),
      );
    } catch {
      showErrorToast("Failed to load invoices");
    }
  };

  const loadCoa = async () => {
    const data = await CoaAPI.loadCoa();
    setCoaList(data);
  };

  /* =======================
     APPLY PAYMENT LOGIC
  ======================= */
  const applyPayment = (updatedInvoices, amount) => {
    let remaining = amount;

    return updatedInvoices.map((inv) => {
      if (!inv.selected || remaining <= 0) {
        return { ...inv, appliedAmount: 0 };
      }

      const applied = Math.min(inv.ar_balance, remaining);
      remaining -= applied;

      return { ...inv, appliedAmount: applied };
    });
  };

  const handleSelectInvoice = (index, checked) => {
    const updated = [...invoices];
    updated[index].selected = checked;
    setInvoices(applyPayment(updated, receiptAmount));
  };

  const appliedTotal = invoices.reduce(
    (sum, inv) => sum + Number(inv.appliedAmount || 0),
    0,
  );

  /* =======================
     SAVE PAYMENT
  ======================= */
  const handleSave = async () => {
    if (!coaId || !receiptNo || !paymentDate || appliedTotal <= 0) {
      return showWarningToast("Incomplete payment details");
    }

    const selectedInvoices = invoices.filter((i) => i.selected);

    if (!selectedInvoices.length) {
      return showWarningToast("No invoice selected");
    }

    try {
      await AccountsPaymentsAPI.addAccountsPayments(
        selectedInvoices[0].ar_id,
        "Customer",
        coaId,
        customer.id,
        null,
        selectedInvoices.map((i) => i.ar_id),
        null,
        referenceNo,
        receiptNo,
        appliedTotal,
        paymentMethod,
        paymentDate,
      );

      showSuccessToast("Payment recorded successfully");
    } catch {
      showErrorToast("Failed to save payment");
    }
  };

  /* =======================
     TABLE CONFIG
  ======================= */
  const headers = ["Invoice No", "Due Date", "Amount Due", "Applied", "Pay"];

  const keys = ["invoice", "due", "amount", "applied", "pay"];

  const tableData = invoices.map((inv, index) => ({
    invoice: inv.si_invoice_no,
    due: inv.due_date,
    amount: inv.amount_due,
    applied: inv.appliedAmount.toFixed(2),
    pay: (
      <input
        type="checkbox"
        checked={inv.selected}
        onChange={(e) => handleSelectInvoice(index, e.target.checked)}
      />
    ),
  }));

  const selectedCustomer = customers.find((c) => c.id === customerId);
  const selectedVendor = vendors.find((v) => v.id === vendorId);
  return (
    <div className="p-5 space-y-6">
      {/* ================= PAGE HEADER ================= */}
      <div>
        <h3 className="text-xl font-semibold">Receive Customer Payment</h3>
        <p className="text-sm text-gray-500">
          Apply receipt to outstanding invoices
        </p>
      </div>

      {/* ================= CARD 1: PAYER ================= */}
      <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-2">
        <h4 className="font-semibold text-gray-700">Payer</h4>

        <div className="grid grid-cols-[140px_320px_1fr] gap-4 items-center">
          {/* TYPE */}
          <FloatingSelect
            label="Type"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            options={[
              { value: "Customer", label: "Customer" },
              { value: "Vendor", label: "Vendor" },
            ]}
          />

          {/* CUSTOMER / VENDOR */}
          {accountType === "Customer" ? (
            <FloatingSelect
              label="Customer"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              options={customers.map((c) => ({
                value: c.id,
                label: `${c.id} - ${c.name}`,
              }))}
            />
          ) : (
            <FloatingSelect
              label="Vendor"
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              options={vendors.map((v) => ({
                value: v.id,
                label: v.vendor_name,
              }))}
            />
          )}

          {/* BILLING ADDRESS */}
          <div className="text-xs text-gray-500 leading-tight">
            {accountType === "Customer" && selectedCustomer?.billing_address}
            {accountType === "Vendor" && selectedVendor?.billing_address}
          </div>
        </div>
      </div>

      {/* ================= CARD 2: RECEIPT DETAILS ================= */}
      <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-4">
        <h4 className="font-semibold text-gray-700">Receipt Details</h4>

        <div className="grid grid-cols-2 gap-4">
          <FloatingInput
            label="Receipt No"
            value={receiptNo}
            onChange={(e) => setReceiptNo(e.target.value)}
          />

          <FloatingInput
            label="Check/Reference No"
            value={referenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
          />

          <FloatingDatePicker
            label="Payment Date"
            value={paymentDate}
            required
            onChange={(e) => setPaymentDate(e.target.value)}
          />

          <FloatingSelect
            label="Cash / Bank Account"
            value={coaId}
            onChange={(e) => setCoaId(e.target.value)}
            options={coaList.map((c) => ({
              value: c.id,
              label: `${c.account_code} - ${c.description}`,
            }))}
          />
        </div>

        {/* RECEIPT AMOUNT (EMPHASIZED) */}
        <div className="max-w-sm">
          <FloatingCurrencyInput
            label="Receipt Amount"
            value={receiptAmount}
            onChange={(e) => {
              const amount = Number(e.target.value || 0);
              setReceiptAmount(amount);
              setInvoices(applyPayment([...invoices], amount));
            }}
          />
        </div>
      </div>

      {/* ================= CARD 3: APPLY TO INVOICES ================= */}
      <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-700">Apply to Invoices</h4>
          <div className="text-lg font-semibold">
            ₱ {appliedTotal.toFixed(2)}
          </div>
        </div>

        <Table headers={headers} keys={keys} data={tableData} />
      </div>

      {/* ================= ACTION ================= */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-md flex items-center space-x-2"
          style={{
            backgroundColor: "var(--main-color)",
            color: "var(--main-text-color)",
          }}
        >
          <LuSaveAll />
          <span>Save Payment</span>
        </button>
      </div>
    </div>
  );
};

export default ReceiveCustomerPayment;
