import React from "react";
import { Switch } from "antd";

/**
 * Works with:
 * [
 *   { label: "✅ Active", value: "ACTIVE" },
 *   { label: "🚫 Inactive", value: "INACTIVE" }
 * ]
 * OR
 * [
 *   { label: "Active", value: true },
 *   { label: "Inactive", value: false }
 * ]
 */
const ToggleStatusButton = ({
  value,
  onChange,
  statusOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false }
  ]
}) => {
  const [onOption, offOption] = statusOptions;

  // Normalize both DB values and UI values to boolean
  const normalize = (val) => {
    if (val === true || val === "ACTIVE") return true;
    if (val === false || val === "INACTIVE") return false;
    return !!val; // fallback
  };

  const isChecked = normalize(value);

  return (
    <Switch
      checked={isChecked}
      onChange={(checked) =>
        onChange(checked ? onOption.value : offOption.value)
      }
      checkedChildren={onOption.label}
      unCheckedChildren={offOption.label}
    />
  );
};

export default ToggleStatusButton;
