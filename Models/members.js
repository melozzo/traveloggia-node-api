const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema(
        {
                MemberID:{type:Number, required:true},
                FirstName:{type:String},
                LastName:{type:String},
                Email:{type:String, required:true},
                Password:{type:String, required:true},
                AccountCreateDate:{type:Date, required:true}


        }, {collection:'Members'}// otherwise mongoose creates a collection named lowercase model name + letter "s"
)

module.exports = mongoose.model("Member", memberSchema)