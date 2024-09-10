let instance = null;
let mongoose = require("mongoose");

class Database {

    constructor() {
        if (!instance) {
            this.mongoConnection = null;
            instance = this;
        }
        return instance;
    }

    async connect(options) {
        console.log("Db Connecting...");
        try {

            let db = await mongoose.connect(options.CONNECTION_STRING);
            this.mongoConnection = db;
            console.log("Db Connected");
        } catch (er) {
            console.error(er);
            process.exit(1);
        }



    }

}

module.exports = Database;