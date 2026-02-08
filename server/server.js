var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const { SetMongo } = require("./services/controller/mongoose");
const cors = require("cors");
const { eventlogger, logger } = require("./middleware/logger");
require("dotenv").config();

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

/* =======================
   SWAGGER LOADER
======================= */
const loadSwagger = require("./document/swaggers.loader");
loadSwagger(app);

// Event logger
app.use((req, res, next) => {
  eventlogger(req, res, next);
});

/* =======================
   ROUTES LOADER
======================= */
const loadRoutes = require("./routes/routes.loader");
loadRoutes(app);


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
