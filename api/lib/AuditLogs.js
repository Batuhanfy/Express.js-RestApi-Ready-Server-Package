const AuditLogModels = require("../db/models/AuditLogs");

let instance = null;
class AuditLogs {
    constructor() {
        if (!instance) {
            instance=this
        }

        return instance;
    }


    info(email, location, proc_type, log) {
        this.#saveToDB({
            level: "INFO",
            email, location, proc_type, log
        })
    }

    warn(email, location, proc_type, log) {
        this.#saveToDB({
            level: "WARNING",
            email, location, proc_type, log
        })
    }

    error(email, location, proc_type, log) {
        this.#saveToDB({
            level: "ERROR",
            email, location, proc_type, log
        })
    }

    debug(email, location, proc_type, log) {
        this.#saveToDB({
            level: "DEBUG",
            email, location, proc_type, log
        })
    }


    verbose(email,location,proc_type,log){
        this.#saveToDB({
         level:"VERBOSE",
         email,location,proc_type,log
        })
        }
     

    #saveToDB({ level, email, location, proc_type, log }) {
        AuditLogModels.create({
            level,
            email,
            location,
            proc_type,
            log

        })
    }

}

module.exports = new AuditLogs();