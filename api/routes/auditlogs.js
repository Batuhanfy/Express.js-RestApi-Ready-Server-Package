const express = require('express');
const Response = require('../Utils/Response');
const router = express.Router();
const AuditLogs = require("../db/models/AuditLogs");

router.post('/', async (req, res, next) => {
   try {
      let body = req.body;
      let query = {}
     if(body.begin_date && body.end_date){

     }


      let auditlogs = await AuditLogs.find(query)



      res.json(Response.successResponse(auditlogs));
   } catch (err) {

      let errorResponse = Response.errorResponse(err)
      res.status(errorResponse.code).json(errorResponse);

   }

})

module.exports = router;