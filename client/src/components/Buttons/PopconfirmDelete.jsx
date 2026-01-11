import React from 'react';
import { Popconfirm, message } from 'antd';
import { Trash2 } from 'lucide-react';

const DeleteConfirmButton = ({ onConfirm }) => {
  const handleConfirm = (e) => {
    message.success('Deleted successfully');
    onConfirm?.(e);
  };

  const handleCancel = () => {
    message.info('Delete cancelled');
  };

  return (
    <Popconfirm
      title="Delete ?"
      description="Are you sure to delete this ?"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      okText="Yes"
      cancelText="No"
    >
      <button className="text-red-500 hover:text-red-700">
        <Trash2 size={16} />
      </button>
    </Popconfirm>
  );
};

export default DeleteConfirmButton;

