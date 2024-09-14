var express = require('express');
var router = express.Router();
const Categories = require("../db/models/Categories");
const Response = require("../Utils/Response");
const AuditLogs = require("../lib/AuditLogs");
const config = require('../config');
const fs = require("fs");
const path = require('path');



/**
 * Create
 * Read
 * Update
 * Delete
 * CRUD
 */



/* GET categories listing. */
router.get('/', async (req, res, next) => {

    try {
        let categories = await Categories.find({});

        res.json(Response.successResponse(categories));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(Response.errorResponse(err));
    }
});

router.post("/add", async (req, res) => {
    let body = req.body;
    try {

        if (!body.name) {
          return res.status(400).json({ message: "NAME bilgisi yok." })
        }

        let category = new Categories({
            name: body.name,
            is_active: true,
            created_by: req.user?.id
        });

        await category.save();

        AuditLogs.info(req.user?.email,"Categories","Add",{category});

        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.post("/update", async (req, res) => {
    let body = req.body;
    try {

        if (!body._id) {
          return res.status(400).json({ message: "id bilgisi yok" })

        }
          

        let updates = {};

        if (body.name) updates.name = body.name;
        if (typeof body.is_active === "boolean") updates.is_active = body.is_active;

        await Categories.updateOne({ _id: body._id }, updates);

        AuditLogs.info(req.user?.email,"Categories","Update",{_id:body._id,...updates});

        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
})

router.post("/delete", async (req, res) => {
    let body = req.body;

    try {
        if (!body._id) 
          {
            return res.status(400).json({ message: "id bilgisi yok" })

          }

        await Categories.deleteOne({ _id: body._id });

        AuditLogs.info(req.user?.email,"Categories","Delete",{_id:body._id});

        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }

})



module.exports = router;
