import FloatingInput from "../../../../../components/Forms/FloatingInput";
import FloatingSelect from "../../../../../components/Forms/FloatingSelect";
import FloatingDatePicker from "../../../../../components/Forms/FloatingDatePicker";

const CustomerDetails = ({
  form,
  customers,
  employees,
  onCustomerSelect,
  onChange,
  setForm,
}) => {
  return (
    <>
      {/* HEADER */}
      <div className="grid grid-cols-4 gap-4">
        <FloatingSelect
          label="Customer"
          value={form.customerId}
          onChange={(e) => onCustomerSelect(e.target.value)}
          options={[
            { value: "", label: "Select Customer" },
            ...customers.map((c) => ({
              value: String(c.id),
              label: `${c.id} (${c.name})`,
            })),
          ]}
        />

        <FloatingInput
          label="Invoice No"
          value={form.invoiceNo}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              invoiceNo: e?.target?.value ?? e ?? "",
            }))
          }
        />

        <FloatingDatePicker
          label="Invoice Date"
          value={form.invoiceDate}
          required
          onChange={(d, v) => setForm((prev) => ({ ...prev, invoiceDate: v }))}
        />

        <FloatingDatePicker
          label="Due Date"
          value={form.dueDate}
          required
          onChange={(d, v) => setForm((prev) => ({ ...prev, dueDate: v }))}
        />
      </div>

      {/* BILL / SHIP */}
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded p-3 space-y-2">
          <h4 className="text-sm font-semibold">Bill To</h4>
          <div>
            <FloatingInput
              label="Name"
              name="billToName"
              value={form.billToName}
              onChange={onChange}
            />
          </div>
          <div>
            <FloatingInput
              label="Address"
              name="billToAddress"
              value={form.billToAddress}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="border rounded p-3 space-y-2">
          <h4 className="text-sm font-semibold">Ship To</h4>
          <div>
            <FloatingInput
              label="Name"
              name="shipToName"
              value={form.shipToName}
              onChange={onChange}
            />
          </div>
          <div>
            <FloatingInput
              label="Address"
              name="shipToAddress"
              value={form.shipToAddress}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      {/* SHIPPING / SALES */}
      <div className="grid grid-cols-4 gap-4">
        <FloatingInput label="Customer PO" />
        <FloatingInput label="Ship Via" />
        <FloatingSelect
          label="Sales Rep"
          value={form.salesRepId}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              salesRepId: e.target.value,
            }))
          }
          options={[
            { value: "", label: "Select Sales Rep" },
            ...employees.map((emp) => ({
              value: emp.id,
              label: emp.fullname || emp.name,
            })),
          ]}
        />
        <FloatingDatePicker
          label="Ship Date"
          value={form.shippingDate}
          onChange={(d, v) => setForm((prev) => ({ ...prev, shippingDate: v }))}
        />
      </div>
    </>
  );
};

export default CustomerDetails;
