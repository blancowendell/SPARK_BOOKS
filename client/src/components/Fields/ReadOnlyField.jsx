const ReadOnlyField = ({ label, value }) => (
  <div>
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="px-3 py-2 border rounded bg-gray-50 text-sm">
      {value ?? "-"}
    </div>
  </div>
);

export default ReadOnlyField;