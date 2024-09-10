let mongoose = require("mongoose");

const schema = mongoose.Schema({
user_id: {
    type:mongoose.SchemaTypes.ObjectId,
    required:true
  },
role_id: {
    type:mongoose.SchemaTypes.ObjectId,
    required:true
  }
},
{
  versionKey: false,
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
}
)

class UserRoles extends mongoose.Model {

}


schema.loadClass(UserRoles);
module.exports=mongoose.model("user_roles",schema);