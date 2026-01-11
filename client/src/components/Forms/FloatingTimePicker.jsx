import React from "react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";

const FloatingTimePicker = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  fullWidth = true,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        ampm
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            id={id}
            fullWidth={fullWidth}
            size="small"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default FloatingTimePicker;
