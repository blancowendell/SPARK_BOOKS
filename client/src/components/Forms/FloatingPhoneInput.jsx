import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  InputAdornment,
  Select,
  FormControl,
  Menu,
  ListItemText,
} from '@mui/material';
import COUNTRY_LIST from '../../utils/CountryList';

const FloatingPhoneInput = ({
  id,
  label = 'Mobile Number',
  value,
  onChange,
  countryCode,
  setCountryCode,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNumberChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    onChange(numericValue);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const handleSelect = (code) => {
    setCountryCode(code);
    handleClose();
  };

  const filteredCountries = COUNTRY_LIST.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dial_code.includes(searchTerm)
  );

  return (
    <FormControl fullWidth size="small">
      <TextField
        id={id}
        label={label}
        variant="outlined"
        value={value}
        onChange={handleNumberChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div onClick={handleOpen} style={{ cursor: 'pointer', fontSize: '0.875rem', minWidth: 80 }}>
                {
                  COUNTRY_LIST.find(c => c.dial_code === countryCode)?.flag
                } {countryCode}
              </div>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <TextField
                  size="small"
                  placeholder="Search..."
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ m: 1, width: 'calc(100% - 16px)' }}
                />
                {filteredCountries.map((country) => (
                  <MenuItem key={country.code} onClick={() => handleSelect(country.dial_code)}>
                    <ListItemText primary={`${country.flag} ${country.name} (${country.dial_code})`} />
                  </MenuItem>
                ))}
              </Menu>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />
    </FormControl>
  );
};

export default FloatingPhoneInput;
