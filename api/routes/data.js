var express = require('express');
var router = express.Router();

router.get("/",(req,res)=>{
    res.json({
        'sayi': 13
    });
});


module.exports=router;