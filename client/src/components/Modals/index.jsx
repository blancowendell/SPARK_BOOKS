import React from 'react';
import { Drawer } from 'antd';

const AntdDrawer = ({
  isOpen,
  onClose,
  title = 'Details',
  children,
  width,
  position,
  drawerclassName,
  bodyStyle = {},
}) => {
  return (
    <Drawer
      title={title}
      placement={position}
      closable={true}
      onClose={onClose}
      open={isOpen}
      width={width}
      className={drawerclassName}
      bodyStyle={bodyStyle}
    >
      {children}
    </Drawer>
  );
};

export default AntdDrawer;

