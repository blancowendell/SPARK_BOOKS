import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FloatingInput = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  fullWidth = true,
  length,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const displayType = isPassword && showPassword ? 'text' : type;

  const isInvalid = length && value.length > length;
  const helperText = isInvalid
    ? `Maximum length is ${length} characters.`
    : required && !value
    ? `${label} is required.`
    : '';

  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      type={displayType}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      size="small"
      required={required}
      error={isInvalid || (required && !value)}
      helperText={helperText}
      inputProps={length ? { maxLength: length } : {}}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
      }}
      InputProps={
        isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  );
};

export default FloatingInput;
