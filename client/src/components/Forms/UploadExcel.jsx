import React from 'react';
import { Upload, Button, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const UploadExcel = ({ label, file, setFile, isLoading = false }) => {
  const props = {
    accept: '.xlsx, .xls, .csv',
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    showUploadList: false,
    disabled: isLoading,
  };

  return (
   <div style={{ marginBottom: '16px' }}>
      <Typography variant="body2" component="label" sx={{ fontWeight: 500, display: 'block', marginBottom: '8px' }}>
        {label}
      </Typography>
      <Upload {...props}>
        <Button
          icon={<UploadOutlined />}
          loading={isLoading}
          disabled={isLoading}
          style={{ borderRadius: '8px', padding: '6px 16px', fontSize: '14px' }}
        >
          {isLoading ? "Uploading..." : "Choose Excel File"}
        </Button>
      </Upload>
      {file && (
        <Typography variant="caption" sx={{ display: 'block', marginTop: '8px', color: 'gray' }}>
          Selected: {file.name}
        </Typography>
      )}
    </div>
  );
};

UploadExcel.propTypes = {
  label: PropTypes.string.isRequired,
  file: PropTypes.object,
  setFile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UploadExcel;
