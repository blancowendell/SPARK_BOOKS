import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FloatingNumberInput = ({
  id,
  label,
  value,
  onChange,
  fullWidth = true,
  inputProps = {},
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
}) => {
  const handleKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'
    ];

    if (
      allowedKeys.includes(e.key) ||
      (e.key >= '0' && e.key <= '9')
    ) {
      return;
    }

    e.preventDefault();
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^\d+$/.test(val)) {
      onChange(val);
    }
  };

  // Increase value by step but not above max
  const increment = () => {
    const current = Number(value) || 0;
    const next = Math.min(current + step, max);
    onChange(String(next));
  };

  // Decrease value by step but not below min
  const decrement = () => {
    const current = Number(value) || 0;
    const next = Math.max(current - step, min);
    onChange(String(next));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
          inputMode: 'numeric',
          pattern: '[0-9]*',
          ...inputProps,
          style: { textAlign: 'right' }, // optional: right-align number input
        }}
        sx={{
          flexGrow: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <IconButton
          aria-label="increment"
          size="small"
          onClick={increment}
          sx={{ p: 0, lineHeight: 1 }}
        >
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton
          aria-label="decrement"
          size="small"
          onClick={decrement}
          sx={{ p: 0, lineHeight: 1 }}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FloatingNumberInput;
