import { TbMinus, TbPlus } from "react-icons/tb";
import FloatingSelect from "../../../../../components/Forms/FloatingSelect";

const LineItemsTable = ({
  lineItems,
  inventoryItems,
  pricingFormulas,
  onAdd,
  onRemove,
  onQtyChange,
  onItemChange,
  onPricingFormulaChange,
}) => {
  const inventoryOptions = inventoryItems.map((i) => ({
    value: String(i.id),
    label: `${i.mi_item_id} - ${i.mi_description} (Qty: ${i.quantity})`,
    disabled: Number(i.quantity) <= 0,
  }));

  const pricingFormulaOptions = pricingFormulas.map((f) => ({
    value: String(f.id),
    label: f.code,
  }));


  return (
    <div className="border rounded">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-10"></th>
            <th className="border p-2 w-20">Qty</th>
            <th className="border p-2 w-36">Item</th>
            <th className="border p-2 w-20">U/M</th>
            <th className="border p-2">Description</th>
            <th className="border p-2 w-32">Unit Price</th>
            <th className="border p-2 w-16">Tax</th>
            <th className="border p-2 w-32">Amount</th>
          </tr>
        </thead>

        <tbody>
          {lineItems.map((row, index) => (
            <tr key={index}>
              {/* REMOVE */}
              <td className="border p-1 text-center">
                <button
                  onClick={() => onRemove(index)}
                  disabled={lineItems.length === 1}
                  className={`
      inline-flex items-center justify-center
      w-7 h-7
      rounded-full
      transition
      ${lineItems.length === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
                    }
    `}
                  title={
                    lineItems.length === 1
                      ? "At least one line item is required"
                      : "Remove line item"
                  }
                >
                  <TbMinus size={14} />
                </button>
              </td>


              {/* QTY */}
              <td className="border p-1">
                <input
                  type="number"
                  min={1}
                  className="w-full text-sm"
                  value={row.quantity}
                  onChange={(e) =>
                    onQtyChange(index, Number(e.target.value) || 1)
                  }
                />
              </td>

              {/* ITEM (SEARCHABLE) */}
              <td className="border p-1">
                <FloatingSelect
                  label="Item"
                  value={row.item_id}
                  options={inventoryOptions}
                  onChange={(e) =>
                    onItemChange(index, e.target.value)
                  }
                />
              </td>

              {/* UOM */}
              <td className="border p-1">{row.oum}</td>

              {/* DESCRIPTION */}
              <td className="border p-1">{row.item_description}</td>

              {/* PRICING */}
              <td className="border p-1">
                <FloatingSelect
                  label="Pricing"
                  value={row.pricing_formula_id || ""}
                  options={[
                    { value: "", label: "Base Price" },
                    ...pricingFormulaOptions,
                  ]}
                  onChange={(e) =>
                    onPricingFormulaChange(index, e.target.value)
                  }
                />

                <div className="text-right text-sm mt-1">
                  {Number(row.unit_price || 0).toFixed(2)}
                </div>
              </td>


              {/* TAX */}
              <td className="border p-1 text-center">✓</td>

              {/* AMOUNT */}
              <td className="border p-1 text-right">
                {Number(row.amount || 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td className="border p-2 text-center">
              <button
                onClick={onAdd}
                className="
                  inline-flex items-center justify-center
                  w-8 h-8
                  rounded-full
                  bg-green-600 text-white
                  hover:bg-green-700
                  active:bg-green-800
                  transition
                "
                title="Add line item"
              >
                <TbPlus size={16} />
              </button>
            </td>
            <td colSpan={7} className="border" />
          </tr>

        </tfoot>
      </table>
    </div>
  );
};

export default LineItemsTable;
