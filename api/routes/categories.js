var express = require('express');
var router = express.Router();


const login = true;

router.all("*",(req,res,next)=>{
    if(login){
        next();
    }else {
        res.json({
            success:false,
            error:"giriş yapınız"
        });
    }
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    success:true
  });
});

module.exports = router;
