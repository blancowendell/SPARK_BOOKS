import React from 'react';
import { Popconfirm, message } from 'antd';
import { CheckCircle  } from 'lucide-react';

const ApproveConfirmButton = ({ onConfirm }) => {
  const handleConfirm = (e) => {
    message.success('Approved successfully');
    onConfirm?.(e);
  };

  const handleCancel = () => {
    message.info('Approve cancelled');
  };

  return (
    <Popconfirm
      title="Approve ?"
      description="Are you sure to approve this ?"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      okText="Yes"
      cancelText="No"
    >
      <button className="text-red-500 hover:text-red-700">
        <CheckCircle  size={16} />
      </button>
    </Popconfirm>
  );
};

export default ApproveConfirmButton;

