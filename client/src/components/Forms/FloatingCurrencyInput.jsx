import React from "react";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";

const FloatingCurrencyInput = ({
  id,
  label = "Amount",
  value,
  onChange,
  fullWidth = true,
  decimalScale = 2,
  allowNegative = false,
}) => {
  return (
    <NumericFormat
      value={value ?? ""}
      thousandSeparator
      decimalScale={decimalScale}
      fixedDecimalScale
      allowNegative={allowNegative}
      prefix="₱ "
      onValueChange={(vals) => {
        const next = vals.floatValue ?? "";
        onChange?.({ target: { value: next } });
      }}
      customInput={TextField}
      id={id}
      label={label}
      variant="outlined"
      size="small"
      fullWidth={fullWidth}
      inputProps={{ inputMode: "decimal" }}
      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
    />
  );
};

export default FloatingCurrencyInput;
