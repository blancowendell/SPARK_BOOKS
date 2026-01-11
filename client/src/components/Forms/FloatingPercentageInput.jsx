import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

const FloatingPercentageInput = ({
  id,
  label = "Percentage",
  value,
  onChange,
  fullWidth = true,
  min = 0,
  max = 100,
  decimalPlaces = 5, // match DB precision
}) => {
  const regex = new RegExp(
    `^\\d{0,${10 - decimalPlaces}}(\\.\\d{0,${decimalPlaces}})?$`
  );

  const handleKeyDown = (e) => {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];

    if (allowedKeys.includes(e.key)) return;

    // Allow only digits and a single dot
    if (!/[0-9.]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    let val = e.target.value;

    if (val === "") {
      onChange(val);
      return;
    }

    // Restrict to decimals within DB precision
    if (regex.test(val)) {
      const num = parseFloat(val);
      if (num >= min && num <= max) {
        onChange(val);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        id={id}
        label={label}
        variant="outlined"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        fullWidth={fullWidth}
        size="small"
        inputProps={{
          inputMode: 'decimal',
          style: { textAlign: 'right' },
        }}
        sx={{
          flexGrow: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
      />
    </Box>
  );
};

export default FloatingPercentageInput;
