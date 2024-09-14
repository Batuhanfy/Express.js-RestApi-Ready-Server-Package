const logger = require('./logger');
let instance = null;

class LoggerClass {

    constructor() {
        if(!instance){
            instance=this;
        }
        return instance;
    }


    createLogObject(email, location, proc_type, log) {
        return {
            level, email, location, proc_type, log
        }
    }


    info(email, location, proc_type, log) {
        let log = this.createLogObject(email, location, proc_type, log);
        logger.info(log);
    }
    warn(email, location, proc_type, log) {
        let log = this.createLogObject(email, location, proc_type, log);
        logger.warn(log);
    }
    error(email, location, proc_type, log) {
        let log = this.createLogObject(email, location, proc_type, log);
        logger.error(log);
    }

    verbose(email, location, proc_type, log) {
        let log = this.createLogObject(email, location, proc_type, log);
        logger.verbose(log);
    }
    silly(email, location, proc_type, log) {
        let log = this.createLogObject(email, location, proc_type, log);
        logger.silly(log);
    }
    http(email, location, proc_type, log) {
        let log = this.createLogObject(email, location, proc_type, log);
        logger.http(log);
    }
    debug(email, location, proc_type, log) {
        let log = this.createLogObject(email, location, proc_type, log);
        logger.debug(log);
    }




}

module.exports = new LoggerClass();