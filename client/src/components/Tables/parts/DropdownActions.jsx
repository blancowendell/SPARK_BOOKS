import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const ActionDropdown = ({ items, onItemClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const menu = (
        <Menu
            onClick={onItemClick} 
            className="rounded-md overflow-hidden text-xs font-semibold shadow-lg border border-[rgba(0,0,0,0.1)]"
            items={items.map((item) => ({
                key: item.key,
                label: (
                    <span className="block px-4 py-2 text-sm text-[var(--main-color)] hover:bg-[var(--main-hover-color)] hover:text-[var(--main-text-color)] cursor-pointer">
                        {item.label}
                    </span>
                ),
            }))}
        />
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={['click']}
            onOpenChange={(open) => setIsDropdownOpen(open)}
        >
            <button
                title="More Actions"
                className="flex items-center justify-between rounded-md px-4 py-2 ps-5 min-w-[120px] border bg-[var(--main-color)] text-[var(--main-text-color)] hover:bg-[var(--main-hover-color)] transition-all"
            >
                <span className="flex-1 text-left uppercase text-xs font-semibold">Action</span>
                <DownOutlined
                    className={`ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
            </button>
        </Dropdown>
    );
};

export default ActionDropdown;
