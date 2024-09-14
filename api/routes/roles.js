const express = require('express');
const router = express.Router();

const Roles = require('../db/models/Roles')
const RolePrivileges = require('../db/models/RolePrivileges')
const Response = require('../Utils/Response')
const mongoose = require("mongoose");
const role_privileges = require('../config/role_privileges');
const auth = require("../lib/auth")();



router.all("*",auth.authenticate(),(req,res,next)=>{
    next();
});


router.get("/", async (req, res) => {
    try {
        let roles = await Roles.find({});
        res.json(Response.successResponse(roles));
    }
    catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
}) 

router.post("/add", async (req, res) => {

    const body = req.body;
    try {
        if (!body.role_name) {
            res.json("Role name içermiyor.");
        }
        else if (!body.permissions || !Array.isArray(body.permissions || body.permissions.length == 0)) {
            res.json("Permission yani yetki içermiyor.");

        }
        else {

            let role = new Roles({
                role_name: body.role_name,
                is_active: true,
                created_by: req.user?.id

            })

            await role.save();

            for (let i = 0; i < body.permissions.length; i++) {
                let priv = new RolePrivileges({
                    role_id: role._id,
                    permission: body.permissions[i],
                    created_by: req.user?.id
                })

                await priv.save();
            }

            res.json(Response.successResponse({ success: true }));
        }
    }
    catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }

})

router.post("/update", async (req, res) => {
    const body = req.body;
    try {
        if (!body._id) {
            return res.status(400).json("Role id'si içermiyor.");
        } else {
            if (body.permissions && Array.isArray(body.permissions) && body.permissions.length > 0) {
                let permissions = await RolePrivileges.find({ role_id: body._id });

                let removedPermissions = permissions.filter(x => !body.permissions.includes(x.permission));
                let newPermissions = body.permissions.filter(x => !permissions.map(p => p.permission).includes(x));

                if (removedPermissions.length > 0) {
                    await RolePrivileges.deleteMany({ _id: { $in: removedPermissions.map(x => x._id) } });
                }
                if (newPermissions.length > 0) {
                    for (let i = 0; i < newPermissions.length; i++) {
                        let priv = new RolePrivileges({
                            role_id: body._id,
                            permission: newPermissions[i],
                            created_by: req.user?.id
                        });

                        await priv.save();
                    }
                }
            }

            let updates = {};
            if (body.role_name) {
                updates.role_name = body.role_name;
            }
            if (typeof body.is_active === "boolean") {
                updates.is_active = body.is_active;
            }

            await Roles.updateOne({ _id: body._id }, updates);

            res.json(Response.successResponse({ success: true }));
        }
    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});



router.post("/delete", async (req, res) => {
    const body = req.body;
    try {
        if (!body._id) {
            res.json("Role id içermiyor.");
        } else {

            await Roles.deleteOne({ _id: body._id });
            res.json(Response.successResponse({ success: true }));


        }
    }
    catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }

})

router.get('/role_privileges', async (req, res) => {
    res.json(role_privileges);
})

module.exports = router;