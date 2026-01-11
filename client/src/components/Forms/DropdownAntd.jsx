import React from "react";
import { Dropdown, Menu, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const DropdownAntd = ({ onMenuClick, options, buttonIcon, buttonProps }) => {
  if (!options || options.length === 0) return null;

  const menu = (
    <Menu onClick={({ key }) => onMenuClick && onMenuClick(key)}>
      {options.map(({ key, label }) => (
        <Menu.Item key={key}>{label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <style>
        {`
          .dynamic-dropdown-btn {
            background-color: var(--main-color);
            color: var(--main-text-color);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: background-color 0.3s ease;
          }

          .dynamic-dropdown-btn:hover {
            background-color: var(--main-hover-color);
          }
        `}
      </style>

      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          type="text"
          icon={buttonIcon || <EllipsisOutlined style={{ fontSize: "24px" }} />}
          className={`dynamic-dropdown-btn ${buttonProps?.className || ""}`}
          {...buttonProps}
        />
      </Dropdown>
    </>
  );
};

export default DropdownAntd;
