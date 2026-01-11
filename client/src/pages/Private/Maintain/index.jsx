import React, { useState } from 'react';
import {
    FaSearch,
    FaPlus,
    FaExclamationTriangle,
    FaTrash,
    FaChevronLeft,
    FaChevronRight,
    FaClock,
    FaChartBar,
    FaLock,
    FaShareAlt,
    FaQuestionCircle
} from 'react-icons/fa';
import { TbReportAnalytics } from 'react-icons/tb';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineAccountTree, MdOutlineInventory2 } from "react-icons/md";
import { MdStorefront } from "react-icons/md";
import { TbUserStar } from "react-icons/tb";

import ChartOfAccountTypes from './parts/ChartOfAccountTypes';
import CustomerTypes from './parts/CustomerTypes';
import InventoryMethods from './parts/InventoryMethods';
import VendorTypes from './parts/VendorTypes';
import SharedReports from './parts/SharedReports';

const ReportsPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activePage, setActivePage] = useState('COA Types');

    const toggleSidebar = () => setCollapsed(!collapsed);

    const renderMainContent = () => {
        switch (activePage) {
            case 'COA Types':
                return <ChartOfAccountTypes />;
            case 'Customers Types':
                return <CustomerTypes />;
            case 'Vendor Types':
                return <VendorTypes />;
            case 'Inventory Methods':
                return <InventoryMethods />;
            case 'Shared reports':
                return <SharedReports />;
            // case 'COA Types':
            default:
                return <ChartOfAccountTypes />;
        }
    };

    const NavItem = ({ label, icon, active, collapsed, onClick }) => (
        <div
            onClick={() => onClick(label)}
            className={`flex items-center px-3 py-2 rounded cursor-pointer hover:bg-gray-100 ${active ? 'bg-gray-200 font-semibold' : ''
                }`}
        >
            <span className="mr-2">{icon}</span>
            {!collapsed && <span>{label}</span>}
        </div>
    );

    return (
        <div className="flex h-screen bg-white shadow rounded-2xl p-3">
            {/* Sidebar */}
            <aside
                className={`${collapsed ? 'w-16' : 'w-64'
                    } bg-white text-gray-800 border-r border-gray-200 flex flex-col p-4 transition-all duration-300 ease-in-out`}
            >
                <div className="flex items-center justify-between mb-6">
                    {!collapsed && <span className="text-2xl font-bold">Maintain</span>}
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem
                        label="COA Types"
                        icon={<MdOutlineAccountTree />}
                        collapsed={collapsed}
                        onClick={setActivePage}
                        active={activePage === 'COA Types'}
                    />
                    <NavItem
                        label="Customers Types"
                        icon={<TbUserStar />}
                        collapsed={collapsed}
                        onClick={setActivePage}
                        active={activePage === 'Customers Types'}
                    />
                    <NavItem
                        label="Vendor Types"
                        icon={<MdStorefront />}
                        collapsed={collapsed}
                        onClick={setActivePage}
                        active={activePage === 'Vendor Types'}
                    />
                    <NavItem
                        label="Inventory Methods"
                        icon={<MdOutlineInventory2 />}
                        collapsed={collapsed}
                        onClick={setActivePage}
                        active={activePage === 'Inventory Methods'}
                    />
                    <NavItem
                        label="Shared reports"
                        icon={<FaShareAlt />}
                        collapsed={collapsed}
                        onClick={setActivePage}
                        active={activePage === 'Shared reports'}
                    />
                    <NavItem
                        label="FUP Violated reports"
                        icon={<FaExclamationTriangle />}
                        collapsed={collapsed}
                        onClick={setActivePage}
                        active={activePage === 'FUP Violated reports'}
                    />
                </nav>

                {/* Footer Items */}
                <div className="mt-auto space-y-2">
                    <NavItem
                        label="Trash"
                        icon={<FaTrash />}
                        collapsed={collapsed}
                        onClick={setActivePage}
                        active={activePage === 'Trash'}
                    />

                    <div
                        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer hover:bg-gray-100 ${collapsed ? 'flex-col' : ''
                            }`}
                        onClick={toggleSidebar}
                    >
                        <div className="flex items-center">
                            <span className="mr-2">
                                <IoSettingsSharp />
                            </span>
                            {!collapsed && <span>Settings</span>}
                        </div>
                        <span
                            className={`transition-transform duration-300 ${collapsed ? 'rotate-180 mt-2' : 'rotate-0'
                                }`}
                        >
                            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
                        </span>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-3 py-2 border-t border-b border-gray-400 rounded-md w-64"
                        />
                        <FaSearch className="text-gray-600" />
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            className="px-4 py-2 rounded flex items-center border border-gray-200 text-gray-700 hover:border-gray-400"
                        >
                            <FaQuestionCircle className="mr-2" /> Help Center
                        </button>
                        {/* <button
                            className="px-4 py-2 rounded flex items-center"
                            style={{
                                backgroundColor: 'var(--main-color)',
                                color: 'var(--main-text-color)',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--main-hover-color)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--main-color)')}
                        >
                            <FaPlus className="mr-2" /> New Report
                        </button> */}
                    </div>
                </header>

                {/* Alert banner */}
                {/* <div className="bg-yellow-100 border-t border-b border-yellow-300 text-yellow-800 px-6 py-3 text-sm flex items-center justify-between">
                    <div>
                        <strong>Date extended:</strong> FUP deadline moved to{' '}
                        <strong>5 November, 2025.</strong> 138 reports still violate limits. Resolve them before deletion.
                        <a href="#" className="text-blue-600 underline ml-2">
                            Click here
                        </a>.
                    </div>
                    <button className="text-gray-600">Hide</button>
                </div> */}

                {/* Dynamic content */}
                <main className="flex-1 items-center justify-center text-center">
                    {renderMainContent()}
                </main>
            </div>
        </div>
    );
};

export default ReportsPage;
