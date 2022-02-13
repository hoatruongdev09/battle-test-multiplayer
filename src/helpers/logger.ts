import winston from 'winston'
import path from 'path'

const options = {
  file: {
    level: 'verbose',
    format: winston.format.simple(),
    filename: path.join(__dirname, 'app.log'),
    json: true,
    colorize: false,
  },
  console: {
    level: 'verbose',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
    json: false,
    colorize: true,
  },
}

const logger = winston.createLogger({
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    //new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
})

export { logger }
