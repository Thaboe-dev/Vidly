require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            winston.add(new winston.transports.File({ filename: 'logs.log' })),
            winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost:27017/vidly' })),
            winston.add(new winston.transports.Console())
        ],
      });
    
    //uncaught exceptions
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'exceptions.log' })
      );
    
    //unhandled promise rejections
    winston.rejections.handle(
        new winston.transports.File({ filename: 'rejections.log' })
      );
}