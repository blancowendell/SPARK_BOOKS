import React, { useState } from "react";
import { Popconfirm, Tooltip, Spin } from "antd";

const IconActionButton = ({
  onConfirm,
  title = "Are you sure?",
  description = "Do you want to proceed?",
  tooltip = "Perform Action",
  tooltipWhenLoading = "Syncing in progress...",
  icon,
  confirmText = "Yes",
  cancelText = "No",
  className = "",
  size = 16,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={handleConfirm}
      okText={confirmText}
      cancelText={cancelText}
      disabled={loading}
    >
      <Tooltip
        title={loading ? tooltipWhenLoading : tooltip}
        open={loading ? true : undefined}
      >
        <button
          disabled={loading}
          className={`p-2 rounded-full transition disabled:opacity-60 ${className}`}
        >
          {loading ? <Spin size="small" /> : icon}
        </button>
      </Tooltip>
    </Popconfirm>
  );
};

export default IconActionButton;
