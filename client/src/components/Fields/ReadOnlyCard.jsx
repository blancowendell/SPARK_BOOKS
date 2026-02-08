const ReadOnlyCard = ({ label, value }) => (
  <div className="bg-gray-50 border rounded-lg p-3">
    <div className="text-xs text-gray-500 uppercase tracking-wide">
      {label}
    </div>
    <div className="text-sm font-medium text-gray-900 mt-1">
      {value || "-"}
    </div>
  </div>
);

export default ReadOnlyCard;
