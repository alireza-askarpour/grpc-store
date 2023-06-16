"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var app_config_1 = require("./config/app.config");
// config
dotenv_1.default.config();
var app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static("uploads"));
// error handler
app.use(function (req, res, next) {
    next(http_errors_1.default.NotFound("Can't find ".concat(req.originalUrl, " on the server!")));
});
app.use(app_config_1.globalErrorHandler);
// listener
app.listen(app_config_1.appListener);
