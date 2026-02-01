var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const { SetMongo } = require("./services/controller/mongoose");
const cors = require("cors");
const { eventlogger, logger } = require("./middleware/logger");
const cron = require("node-cron");
const basicAuth = require("basic-auth");
const swaggerDocsAdmin = require("./document/admin.swagger");
const swaggerDocsCustomer = require("./document/customer.swagger");
const swaggerUi = require("swagger-ui-express");
const { DecrypterString } = require("./services/repository/cryptography");
require("dotenv").config();

// Swagger Auth Middleware
function swaggerAuth(req, res, next) {
  let decryptpassword = DecrypterString(`${process.env._SWAGGER_PASS}`);
  const user = basicAuth(req);
  const username = `${process.env._SWAGGER_USER}`;
  const password = decryptpassword;

  if (!user || user.name !== username || user.pass !== password) {
    res.set("WWW-Authenticate", 'Basic realm="Swagger API Docs"');
    return res.status(401).send("Authentication required.");
  }
  next();
}

//#region ROUTES PRIVATE

var accessRouter = require("./routes/private/access.routes");
var accessTypeRouter = require("./routes/private/accessType.routes");
var employeeRouter = require("./routes/private/employee.routes");
var maintenanceSequenceRouter = require("./routes/private/maintenanceSequence.routes");
var maintenanceUsersRouter = require("./routes/private/maintenanceUsers.routes");
var dashboardApiRouter = require("./routes/private/dashboardApi.routes");
var maintenanceApiRouter = require("./routes/private/maintenanceApi.routes");
var dashboardRouter = require("./routes/private/dashboard.routes"); 
var maintenanceDashboardRouter = require("./routes/private/maintenanceDashboard.routes");
var securityRouter = require("./routes/private/security.routes");

var masterCoaTypeRouter = require("./routes/private/masterCoaType.routes");
var masterCoaRouter = require("./routes/private/masterCoa.routes");
var masterCustomerTypeRouter = require("./routes/private/masterCustomerType.routes");
var masterVendorTypeRouter = require("./routes/private/masterVendorType.routes");
var masterCustomerGeneralRouter = require("./routes/private/masterCustomerGeneral.routes");
var masterVendorGeneralRouter = require("./routes/private/masterVendorGeneral.routes");
var masterInventoryMethodsRouter = require("./routes/private/masterInventoryMethods.routes");
var coaRunBalRouter = require("./routes/private/coaRunBal.routes");
var masterInventoryRouter = require("./routes/private/masterInventory.routes");
var inventoryPricingRouter = require("./routes/private/inventoryPricing.routes");
var pricingFormulaRouter = require("./routes/private/pricingFormula.routes");
var inventoryHistoryRouter = require("./routes/private/inventoryHistory.routes");
var inventoryQuantityRouter = require("./routes/private/inventoryQuantity.routes");
//#endregion

//#region ROUTES PUBLIC

var loginRouter = require("./routes/public/login.routes");
var psgcRouter = require("./routes/public/psgc.routes");

var addressLocationRouter = require("./routes/public/addressLocation.routes");
//#endregion

const verifyJWT = require("./middleware/authenticator");
const { UnauthorizedTemplate } = require("./services/repository/helper");

var app = express();

// Set up MongoDB connection
SetMongo(app);

// Middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" })); // ✅ FIXED: Added size limit
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 500000 })
);
app.use(cookieParser());

// CORS
const allowedOrigins = (process.env._CORS_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(origin => origin.length > 0)

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        console.log(allowedOrigins, 'allowed')
        return callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)


// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Swagger UI
app.use(
  "/api-admin",
  swaggerAuth,
  swaggerUi.serveFiles(swaggerDocsAdmin, {}),
  swaggerUi.setup(swaggerDocsAdmin)
);

app.use(
  "/api-customer",
  swaggerAuth,
  swaggerUi.serveFiles(swaggerDocsCustomer, {}),
  swaggerUi.setup(swaggerDocsCustomer)
);

// Event logger
app.use((req, res, next) => {
  eventlogger(req, res, next);
});

//#region ROUTES USE PUBLIC

app.use("/", loginRouter);
app.use("/psgc", psgcRouter);

app.use("/address_location", addressLocationRouter);
//#endregion

app.use(verifyJWT);

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
//#endregion

// 404 handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  logger.error(err);
  console.log(err.message);
  res.status(err.status || 500);
  res.send(UnauthorizedTemplate());
});

module.exports = app;
