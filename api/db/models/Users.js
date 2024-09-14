let mongoose = require("mongoose");
const is= require("is_js");
const CustomError = require("../../lib/Error")
const {PASS_LENGTH,HTTP_CODES} = require("../../config/Enum")
const bcrypt = require("bcrypt")

const schema = mongoose.Schema({

    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    is_active:{type:Boolean,default:true},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    phone_number:{type:String,required:true},
},
{
  versionKey:false,
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
}
)

class Users extends mongoose.Model {

validPassword(password){
  return bcrypt.compareSync(password,this.password)
}

static validateFieldsforAuth(email,password){
  if(typeof password !== "string" || password.length < 8 || is.not.email(email)){
  throw new CustomError(HTTP_CODES.UNAUTHORIZED,"Validation Error","email or password wrong")
 
}
return null;
}


}


schema.loadClass(Users);
module.exports=mongoose.model("users",schema);