"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const options = {
    file: {
        level: 'verbose',
        format: winston_1.default.format.simple(),
        filename: path_1.default.join(__dirname, 'app.log'),
        json: true,
        colorize: false,
    },
    console: {
        level: 'verbose',
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        json: false,
        colorize: true,
    },
};
const logger = winston_1.default.createLogger({
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        //new winston.transports.File(options.file),
        new winston_1.default.transports.Console(options.console),
    ],
    exitOnError: false,
});
exports.logger = logger;
