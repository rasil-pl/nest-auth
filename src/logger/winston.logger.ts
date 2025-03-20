import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(
  (info: {
    timestamp: string;
    level: string;
    stack?: string;
    message: string;
    context?: string;
  }) => {
    const { timestamp, level, stack, message, context } = info;
    return `${timestamp} - [${level}] - [${context}] - ${message || stack}`;
  },
);

const options = {
  file: {
    filename: 'error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
  },
};

const devLogger = createLogger({
  level: 'silly',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize({ level: true }),
    customFormat,
  ),
  transports: [new transports.Console(options.console)],
});

export const instance = devLogger;
