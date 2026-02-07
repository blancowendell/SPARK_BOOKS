const verifyJWT = require("../middleware/authenticator");

module.exports = (app) => {
  //#region ROUTES PUBLIC
  var loginRouter = require("./public/login.routes");
  var psgcRouter = require("./public/psgc.routes");

  var addressLocationRouter = require("./public/addressLocation.routes");

  //#endregion

  //#region ROUTES USE PUBLIC
  app.use("/", loginRouter);
  app.use("/psgc", psgcRouter);

  app.use("/address_location", addressLocationRouter);

  //#endregion

  /* =======================
     JWT MIDDLEWARE
  ======================= */
  app.use(verifyJWT);

  //#region ROUTES PRIVATE
  var accessRouter = require("./private/access.routes");
  var accessTypeRouter = require("./private/accessType.routes");
  var employeeRouter = require("./private/employee.routes");
  var maintenanceSequenceRouter = require("./private/maintenanceSequence.routes");
  var maintenanceUsersRouter = require("./private/maintenanceUsers.routes");
  var dashboardApiRouter = require("./private/dashboardApi.routes");
  var maintenanceApiRouter = require("./private/maintenanceApi.routes");
  var dashboardRouter = require("./private/dashboard.routes");
  var maintenanceDashboardRouter = require("./private/maintenanceDashboard.routes");
  var securityRouter = require("./private/security.routes");

  var masterCoaTypeRouter = require("./private/masterCoaType.routes");
  var masterCoaRouter = require("./private/masterCoa.routes");
  var masterCustomerTypeRouter = require("./private/masterCustomerType.routes");
  var masterVendorTypeRouter = require("./private/masterVendorType.routes");
  var masterCustomerGeneralRouter = require("./private/masterCustomerGeneral.routes");
  var masterVendorGeneralRouter = require("./private/masterVendorGeneral.routes");
  var masterInventoryMethodsRouter = require("./private/masterInventoryMethods.routes");
  var coaRunBalRouter = require("./private/coaRunBal.routes");
  var masterInventoryRouter = require("./private/masterInventory.routes");
  var inventoryPricingRouter = require("./private/inventoryPricing.routes");
  var pricingFormulaRouter = require("./private/pricingFormula.routes");
  var inventoryHistoryRouter = require("./private/inventoryHistory.routes");
  var inventoryQuantityRouter = require("./private/inventoryQuantity.routes");
  var salesInvoiceRouter = require("./private/salesInvoice.routes");
  var masterSalesRepRouter = require("./private/masterSalesRep.routes");
  //#endregion

  //#region ROUTES USE PRIVATE
  app.use("/access_type", accessTypeRouter);
  app.use("/access", accessRouter);
  app.use("/employees", employeeRouter);
  app.use("/maintenance_sequence", maintenanceSequenceRouter);
  app.use("/maintenance_users", maintenanceUsersRouter);
  app.use("/dashboard_api", dashboardApiRouter);
  app.use("/maintenance_api", maintenanceApiRouter);
  app.use("/dashboard", dashboardRouter);
  app.use("/maintenance_dashboard", maintenanceDashboardRouter);
  app.use("/security", securityRouter);

  app.use("/master_coa_type", masterCoaTypeRouter);
  app.use("/master_coa", masterCoaRouter);
  app.use("/master_customer_type", masterCustomerTypeRouter);
  app.use("/master_vendor_type", masterVendorTypeRouter);
  app.use("/master_customer_general", masterCustomerGeneralRouter);
  app.use("/master_vendor_general", masterVendorGeneralRouter);
  app.use("/master_inventory_methods", masterInventoryMethodsRouter);
  app.use("/coa_run_bal", coaRunBalRouter);
  app.use("/master_inventory", masterInventoryRouter);
  app.use("/inventory_pricing", inventoryPricingRouter);
  app.use("/pricing_formula", pricingFormulaRouter);
  app.use("/inventory_history", inventoryHistoryRouter);
  app.use("/inventory_quantity", inventoryQuantityRouter);
  app.use("/sales_invoice", salesInvoiceRouter);
  app.use("/master_sales_rep", masterSalesRepRouter);
  //#endregion
};
