import FloatingInput from "../../../../../components/Forms/FloatingInput";

const InvoiceTotals = ({ form, onChange, vatAmount }) => {
  return (
    <div className="flex justify-end">
      <div className="w-[420px] border rounded p-4 bg-gray-50">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Invoice Totals
        </h4>

        <div className="grid grid-cols-2 gap-4">
          {/* LEFT – INPUTS */}
          <div className="space-y-3">
            <div>
              <FloatingInput
                label="Additional Sales Tax (%)"
                name="salesTax"
                value={form.salesTax}
                onChange={onChange}
              />
            </div>

            {/* ✅ COMPUTED VAT VALUE */}
            <div>
              <FloatingInput
                label="VAT (12%)"
                value={vatAmount.toFixed(2)}
                disabled
              />
            </div>

            <div>
              <FloatingInput
                label="Freight"
                name="freight"
                value={form.freight}
                onChange={onChange}
              />
            </div>
          </div>

          {/* RIGHT – TOTALS */}
          <div className="space-y-3">
            <div>
              <FloatingInput
                label="Invoice Total"
                value={form.invoiceTotal}
                disabled
              />
            </div>

            <div>
              <FloatingInput label="Net Due" value={form.netDue} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotals;
