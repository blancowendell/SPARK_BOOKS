// In ./routes/utility/logger.js

const winston = require("winston");

// Create the logger instance
const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: "error.log", level: "error" }) // Log errors to a file
  ]
});

// Event logger function (optional if you want to log requests)
function eventlogger(req, res, next) {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
}

module.exports = { logger, eventlogger };
