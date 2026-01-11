import React from 'react';
import TextField from '@mui/material/TextField';

const FloatingTextArea = ({
  id,
  label,
  value,
  onChange,
  rows = 4,
  fullWidth = true
}) => {
  return (
    <TextField
      id={id}
      label={label}
      multiline
      rows={rows}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth={fullWidth}
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
      }}
    />
  );
};

export default FloatingTextArea;
