import winston from 'winston';
import config from '@config/config';
import { LoggerConfig } from '@config/types';

class ApplicationLogger {
    parentLogger: winston.Logger;

    constructor(loggerConfig: LoggerConfig) {
        this.parentLogger = winston.createLogger({
            format: winston.format.json(),
            level: loggerConfig.logLevel ?? 'info',
            transports: [
                new winston.transports.File({
                    filename: 'server.log',
                    level: loggerConfig.logLevel ?? 'info',
                }),
            ],
        });

        if (process.env.NODE_ENV !== 'production') {
            this.parentLogger.add(new winston.transports.Console({
                format: winston.format.simple(),
                level: loggerConfig.logLevel ?? 'info',
            }));
        }
    }

    createLogger = (name: string): winston.Logger => {
        const childLogger = this.parentLogger.child({ defaultMeta: { name }});
        return childLogger;
    };
}

export default new ApplicationLogger(config.log ?? {});