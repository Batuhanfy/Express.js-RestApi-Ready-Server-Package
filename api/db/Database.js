let instance=null;
let mongoose = require("mongoose");

class Database {

    constructor(){
        if(!instance){
            this.mongoConnection = null;
            instance=this;
        }
        return instance;
    }

    async connect(options){
    let db = await mongoose.connect(options.CONNECTION_STRING);
    this.mongoConnection=db;
    }

}

module.exports = Database;