import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

const ApprovalButtons = ({
  status,
  pendingStatus = "PENDING",
  approveLabel = "Approve",
  rejectLabel = "Reject",
  onApprove,
  onReject,
  disabled = false,
  showStatusText = true,
}) => {
  // NOT PENDING → STATUS ONLY
  if (status !== pendingStatus) {
    return showStatusText ? (
      <div className="flex justify-end items-center gap-2 pt-4 border-t text-sm text-gray-500">
        <FaInfoCircle className="text-gray-400" />
        <span>
          Status: <strong>{status}</strong>
        </span>
      </div>
    ) : null;
  }

  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      {/* REJECT */}
      <button
        type="button"
        disabled={disabled}
        onClick={onReject}
        className={`flex items-center gap-2 px-4 py-2 rounded text-white font-medium transition
          ${
            disabled
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }
        `}
      >
        <FaTimesCircle className="text-base" />
        {rejectLabel}
      </button>

      {/* APPROVE */}
      <button
        type="button"
        disabled={disabled}
        onClick={onApprove}
        className={`flex items-center gap-2 px-4 py-2 rounded text-white font-medium transition
          ${
            disabled
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }
        `}
      >
        <FaCheckCircle className="text-base" />
        {approveLabel}
      </button>
    </div>
  );
};

export default ApprovalButtons;
