
const Moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const mapSchema = new Schema({
        Name:{type:String, required:true},
        MapID: {type:Number,required:true },
        MemberID:{type:Number, },
        IsDeleted:{type:Boolean, default:false},
        CreateDate:{type:Date, required:true}     
}, {collection:'Maps'})

module.exports=mongoose.model('Map',mapSchema)





