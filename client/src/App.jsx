import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/Private/Dashboard";
import Settings from "./pages/Private/Settings";
import MainLayout from "./layouts/MainLayout";
import AdminLoginPage from "./pages/Public/Login";
import RoleProtectedRoute from "./components/Tokens/RoleProtectedRoute";
import { AuthProvider } from "./api/public/auth/parts/authContext";
import DevTools from "./pages/Private/DevTools";
import Security from "./pages/Private/Security";
import AdminReports from "./pages/Private/Reports"; 
import Employees from "./pages/Private/Employees";
import SamplePage from "./pages/Private/SamplePage";
import ForgotPasswordPage from "./components/Pages/ForgotPassword";
import "react-toastify/dist/ReactToastify.css";
import ChartOfAccounts from "./pages/Private/ChartOfAccounts";
import Maintain from "./pages/Private/Maintain";
import Inventory from "./pages/Private/Inventory";
import InventoryHistory from "./pages/Private/InventoryHistory";
import Customer from "./pages/Private/Customer";
import Invoicing from "./pages/Private/Invoicing";
import ReceiveCustomerPayment from "./pages/Private/ReceiveCustomerPayment";
import SalesOrderApproval from "./pages/Private/SalesOrders";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLoginPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/unauthorized" element={<div>Access Denied</div>} />

          {/* Admin Routes */}
          <Route
            path="/index"
            element={<RoleProtectedRoute allowedRoles={["Administrator"]} />}
          >
            <Route element={<MainLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="reportsPanel" element={<AdminReports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="devtools" element={<DevTools />} />
              <Route path="security" element={<Security />} />
              <Route path="employees" element={<Employees />} />
              <Route path="samplepage" element={<SamplePage />} />
              <Route path="chartOfAccounts" element={<ChartOfAccounts />} />
              <Route path="maintainPanel" element={<Maintain />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="customer" element={<Customer />} />
              <Route path="inventoryHistory" element={<InventoryHistory />} />
              <Route path="invoicing" element={<Invoicing />} />
              <Route path="recievingMoney" element={<ReceiveCustomerPayment />} />
              <Route path="salesOrder" element={<SalesOrderApproval />} />
            </Route>
          </Route>

          {/* Customer Routes */}
          {/* <Route
            path="/customer/index"
            element={<RoleProtectedRoute allowedRoles={["Customer"]} />}
          >
            <Route element={<MainLayout />}>
              <Route index element={<CustomerDashboard />} />
              <Route path="createticket" element={<CustomerCreateTicket />} />
            </Route>
          </Route> */}

          {/* Provider Routes (example placeholder) */}
          {/* <Route
            path="/provider/index"
            element={<RoleProtectedRoute allowedRoles={["Provider"]} />}
          >
            <Route element={<MainLayout />}>
              <Route index element={<div>Provider Dashboard</div>} />
            </Route>
          </Route> */}

          {/* Catch-All */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
