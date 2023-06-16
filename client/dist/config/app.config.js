"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.appListener = exports.isDevelopment = exports.isProduction = exports.mode = exports.port = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var chalk_1 = __importDefault(require("chalk"));
var http_errors_1 = __importDefault(require("http-errors"));
dotenv_1.default.config();
exports.port = process.env.PORT || 3000;
exports.mode = process.env.NODE_ENV || "production";
exports.isProduction = process.env.NODE_ENV === "production";
exports.isDevelopment = process.env.NODE_ENV === "development";
var appListener = function () {
    var runningMode = "Server running in ".concat(chalk_1.default.bold(exports.mode), " mode");
    var runningOnPort = "on port ".concat(chalk_1.default.bold(exports.port), " port");
    var runningSince = "[since ".concat(new Date().toISOString(), "]");
    console.log("\uD83C\uDFC1 \u2014> ".concat(runningMode, " ").concat(runningOnPort, " ").concat(runningSince));
};
exports.appListener = appListener;
var globalErrorHandler = function (err, req, res, next) {
    var serverError = http_errors_1.default.InternalServerError("INTERNAL_SERVER_ERROR");
    var statusCode = err.status || serverError.status;
    var message = err.message || serverError.message;
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
    });
};
exports.globalErrorHandler = globalErrorHandler;
