var express = require('express');
var router = express.Router();
var Users = require("../db/models/Users");
var Response = require("../Utils/Response");
const { HttpStatusCode } = require('axios');
const bcrypt = require('bcrypt')
const is = require("is_js");
const UserRoles = require('../db/models/UserRoles');
const Roles = require('../db/models/Roles');


/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {

    let users = await Users.find({});

    res.json(Response.successResponse(users));







  } catch (er) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);

  }
});




router.post("/add", async (req, res) => {
  let body = req.body;
  try {

    if (!body.email || !body.password) {
      return res.status(400).json({ message: "Verileri tam gönderiniz." });
    }

    if (is.not.email(body.email)) { // is_js kütüphanesi ile email mi kontrol ediyoruz !is.email yerine böyle bir kullanımı da var is.not şeklinde
      return res.status(400).json({ message: "E-Postayı doğru gönderiniz." });
    }

    if (body.email < 4 || body.password < 8) {
      return res.status(400).json({ message: "Email ve şifre uzunluklarına dikkat ediniz." })
    }


    if (!body.roles || !Array.isArray(body.roles || body.roles.length == 0)) {
      return res.status(400).json({ message: "Rol durumu hatalı" })
    }



    let password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null)

    let newUser = await Users.create({
      email: body.email,
      password, // key ve value değeri aynıysa direkt kendisini yazarak da tanımlayabilirsin password:password yerine yani.
      first_name: body.first_name ? body.first_name : "",
      last_name: body.last_name ? body.last_name : "",
      phone_number: body.phone_number ? body.phone_number : ""
    })

    let roles = await Roles.find({ _id: { $in: body.roles } })

    if (roles.length == 0) {
      return res.status(400).json({ message: "Belirtilen roller sistemde yok." })
    }

    for (let i = 0; i < roles.length; i++) {
      await UserRoles.create({
        user_id: newUser._id,
        role_id: roles[i]._id
      })
    }





    res.status(HttpStatusCode.Created).json(Response.successResponse({ success: true }, 201));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);

  }
});

router.post("/update", async (req, res) => {
  const body = req.body;
  try {
    // ID'nin varlığını kontrol et
    if (!body._id) {
      return res.status(400).json({ success: false, message: "_id değerini giriniz" });
    }

    // Güncellenecek alanları belirle
    const update = {};

    if (typeof body.is_active === "boolean") {
      update.is_active = body.is_active;
    }
    if (body.password && body.password.length > 7) { // length > 7 yerine body.password.length kullanıldı
      update.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8));
    }
    if (body.first_name) {
      update.first_name = body.first_name;
    }
    if (body.last_name) {
      update.last_name = body.last_name;
    }
    if (body.phone_number) {
      update.phone_number = body.phone_number;
    }

    // Roller ile ilgili işlemler
    if (Array.isArray(body.roles) && body.roles.length > 0) {
      // Kullanıcının mevcut rollerini al
      let userRoles = await UserRoles.find({ user_id: body._id });

      // Yeni roller ve kaldırılacak roller
      let removedRoles = userRoles.filter(x => !body.roles.includes(x.role_id));
      let newRoles = body.roles.filter(x => !userRoles.map(r => r.role_id).includes(x));

      // Kaldırılacak rollerin yetkilerini sil
      if (removedRoles.length > 0) {
        await UserRoles.deleteMany({ _id: { $in: removedRoles.map(x => x._id) } });
      }

      // Yeni roller ekle
      if (newRoles.length > 0) {
        for (let i = 0; i < newRoles.length; i++) {
          let userRole = new UserRoles({
            role_id: newRoles[i],
            user_id: body._id
          });
          await userRole.save();
        }
      }
    }

    // Kullanıcıyı güncelle
    const result = await Users.updateOne({ _id: body._id }, { $set: update });

    if (result.modifiedCount > 0) {
      res.json({ success: true, message: "Başarıyla güncellendi." });
    } else {
      res.status(404).json({ success: false, message: "Kullanıcı bulunamadı veya değişiklik yapılmadı." });
    }

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});



router.post("/delete", async (req, res) => {
  try {
    const body = req.body;

    if (!body._id && body._id > 5) {
      return res.status(400).json("ID değerini giriniz.");
    }

    await Users.deleteOne({ _id: body._id });

    await UserRoles.deleteMany({
      user_id:body._id
    })

    res.json({ success: true, message: "Başarıyla silindi." });


  } catch (err) {
    const errorResponse = Response.ErrorMessage(err)
    res.status(errorResponse.code).json(errorResponse)
  }

})






router.post("/register", async (req, res) => {
  let body = req.body;
  try {


    let user = await Users.findOne({});
    if (user) { // eğer sistemde bir kişi bile varsa bu endpointi kullanamazsın
      return res.sendStatus(404);
    }

    if (!body.email || !body.password) {
      return res.status(400).json({ message: "Verileri tam gönderiniz." });
    }

    if (is.not.email(body.email)) { // is_js kütüphanesi ile email mi kontrol ediyoruz !is.email yerine böyle bir kullanımı da var is.not şeklinde
      return res.status(400).json({ message: "E-Postayı doğru gönderiniz." });
    }

    if (body.email < 4 || body.password < 8) {
      return res.status(400).json({ message: "Email ve şifre uzunluklarına dikkat ediniz." })
    }

    let password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null)

    let createdUser = await Users.create({
      email: body.email,
      password, // key ve value değeri aynıysa direkt kendisini yazarak da tanımlayabilirsin password:password yerine yani.
      first_name: body.first_name ? body.first_name : "",
      last_name: body.last_name ? body.last_name : "",
      phone_number: body.phone_number ? body.phone_number : ""
    })


    let newAdminRole = await Roles.create({
      role_name: "SUPER_ADMIN",
      created_by: createdUser._id
    })



    await UserRoles.create({
      user_id: createdUser._id,
      role_id: newAdminRole._id
    })




    res.status(HttpStatusCode.Created).json(Response.successResponse({ success: true }, 201));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);

  }
});

module.exports = router;