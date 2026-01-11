import React from 'react';
import TextField from '@mui/material/TextField';

const FloatingTimeInput = ({
  id,
  label,
  value,
  onChange,
  required = false,
  fullWidth = true,
  minTime,
  maxTime,
}) => {
  const isInvalid =
    (required && !value) ||
    (minTime && value < minTime) ||
    (maxTime && value > maxTime);

  const helperText =
    required && !value
      ? `${label} is required.`
      : minTime && value < minTime
      ? `Time must be after ${minTime}`
      : maxTime && value > maxTime
      ? `Time must be before ${maxTime}`
      : '';

  return (
    <TextField
      id={id}
      label={label}
      type="time"
      value={value}
      onChange={onChange}
      required={required}
      fullWidth={fullWidth}
      size="small"
      error={isInvalid}
      helperText={helperText}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300,
        min: minTime,
        max: maxTime,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
      }}
    />
  );
};

export default FloatingTimeInput;
