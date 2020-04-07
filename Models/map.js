
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const mapSchema = new Schema({
        Name:{type:String, required:true},
        MapID: {type:Number,required:true },// because we are using the old data which was number id with new - object id - we have to settle on String
        MemberID:{type:Number, },
        IsDeleted:{type:Boolean, default:false},
        CreateDate:{type:Date, required:true},  
        LastRevision:{type:Date}   
}, {collection:'Maps'})

module.exports=mongoose.model('Map',mapSchema)





