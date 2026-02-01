import React, { useMemo } from "react";
import { DatePicker } from "antd";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";


const FloatingDatePicker = ({
  id,
  label,
  value,
  onChange,
  fullWidth = true,
  disabled = false,
  format = "YYYY-MM-DD",
  required = false,
  length,
  allowClear = true,
}) => {
  const dateObj = useMemo(() => {
    if (!value) return null;
    if (typeof value === "string") {
      const d = dayjs(value);
      return d.isValid() ? d : null;
    }
    return dayjs.isDayjs(value) ? value : dayjs(value);
  }, [value]);

  const displayValue = dateObj ? dateObj.format(format) : "";

  const isInvalid = length && displayValue.length > length;
  const helperText = isInvalid
    ? `Maximum length is ${length} characters.`
    : required && !displayValue
    ? `${label} is required.`
    : "";

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(null, "");
  };

  const handleDateChange = (date, dateString) => {
    onChange?.(date, dateString);
  };

  return (
    <div
      style={{
        width: fullWidth ? "100%" : "auto",
        marginTop: 8,
        marginBottom: 16,
        position: "relative",
      }}
    >
      <TextField
        id={id}
        label={label}
        variant="outlined"
        value={displayValue}
        fullWidth={fullWidth}
        size="small"
        required={required}
        error={isInvalid || (required && !displayValue)}
        helperText={helperText}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              {displayValue && allowClear && !disabled ? (
                <IconButton onClick={handleClear} size="small" edge="end">
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
          sx: {
            borderRadius: "8px",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <DatePicker
          id={`${id}-hidden`}
          value={dateObj}
          onChange={handleDateChange}
          format={format}
          disabled={disabled}
          allowClear={false}
          getPopupContainer={() => document.body}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
};

export default FloatingDatePicker;
