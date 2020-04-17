const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const photoSchema = new Schema({
        PhotoID:{type:Number, required:true},
        SiteID:{type:Number, required:true},
        FileName:{type:String, required:true},
        StorageURL:{type:String},
        DateAdded:{type:Date, required:true},
        DateTaken:{type:Date},
        Caption:{type:String},
        IsDeleted:{type:Boolean, default:false}

}, {collection:"Photos", timestamps:true})


module.exports = mongoose.model('Photo', photoSchema)
