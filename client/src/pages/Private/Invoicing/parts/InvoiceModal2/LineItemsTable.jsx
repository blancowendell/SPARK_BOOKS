import { TbMinus, TbPlus } from "react-icons/tb";

const LineItemsTable = ({
  lineItems,
  inventoryItems,
  pricingFormulas, // 🔥 NEW

  onAdd,
  onRemove,
  onQtyChange,
  onItemChange,
  onPricingFormulaChange, // 🔥 NEW
}) => {
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
              <td className="border p-1 text-center">
                <button
                  onClick={() => onRemove(index)}
                  disabled={lineItems.length === 1}
                >
                  <TbMinus />
                </button>
              </td>

              <td className="border p-1">
                <input
                  type="number"
                  min={1}
                  value={row.quantity}
                  onChange={(e) =>
                    onQtyChange(index, Number(e.target.value) || 1)
                  }
                />
              </td>

              <td className="border p-1">
                <select
                  value={row.item_id}
                  onChange={(e) => onItemChange(index, e.target.value)}
                >
                  <option value="">Select Item</option>
                  {inventoryItems.map((i) => (
                    <option key={i.id} value={String(i.id)}>
                      {i.mi_item_id}
                    </option>
                  ))}
                </select>
              </td>

              <td className="border p-1">{row.oum}</td>
              <td className="border p-1">{row.item_description}</td>
              <td className="border p-1">
                <select
                  value={row.pricing_formula_id || ""}
                  onChange={(e) =>
                    onPricingFormulaChange(index, e.target.value)
                  }
                  className="w-full text-xs"
                >
                  <option value="">Base Price</option>
                  {pricingFormulas.map((f) => (
                    <option key={f.id} value={String(f.id)}>
                      {f.code}
                    </option>
                  ))}
                </select>

                <div className="text-right text-sm mt-1">
                  {row.unit_price.toFixed(2)}
                </div>
              </td>

              <td className="border p-1 text-center">✓</td>
              <td className="border p-1 text-right">{row.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td className="border p-2 text-center">
              <button onClick={onAdd}>
                <TbPlus />
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
