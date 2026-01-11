import React from "react";
import {
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const FloatingCheckbox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};

export default FloatingCheckbox;
