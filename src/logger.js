const { createLogger, format, transports } = require("winston");

const loggerConfig = {
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" })
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/error.log" })]
};

// Unless in production log to the console
if (process.env.NODE_ENV !== "production") {
  loggerConfig.transports.push(
    new transports.Console({
      format: format.simple(),
      level: "debug"
    })
  );
}

// seperate test logs
if (process.env.NODE_ENV === "test") {
  loggerConfig.transports = [
    new transports.File({ filename: "logs/test.log", level: "debug" })
  ];
  loggerConfig.exceptionHandlers = [
    new transports.File({ filename: "logs/test.log" })
  ];
}

module.exports = createLogger(loggerConfig);
