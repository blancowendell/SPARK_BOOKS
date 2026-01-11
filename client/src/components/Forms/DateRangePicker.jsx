import React from 'react';
import { DatePicker } from 'antd';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const FloatingDateRangePicker = ({
  id,
  label,
  value,
  onChange,
  fullWidth = true,
  disabled = false,
}) => {
  return (
    <div style={{ width: fullWidth ? '100%' : 'auto', marginTop: 8, marginBottom: 16 }}>
      {label && (
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ marginBottom: 0.5, fontWeight: 500 }}
        >
          {label}
        </Typography>
      )}
      <RangePicker
        id={id}
        value={value}
        onChange={onChange}
        format="YYYY-MM-DD"
        disabled={disabled}
        allowClear
        style={{
          width: '100%',
          borderRadius: 8,
          padding: '6.5px 11px',
          height: 40,
        }}
        dropdownClassName="custom-date-picker"
      />
    </div>
  );
};

export default FloatingDateRangePicker;
