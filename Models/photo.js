const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* storageURL =  amazon s3 - we need this to distinguish from old files stored on traveloggia.net 
( to do move old images to amazon) */

const photoSchema = new Schema({
        PhotoID:{type:Number, required:true},
        SiteID:{type:Number, required:true},
        FileName:{type:String, required:true},
        StorageURL:{type:String},
        DateAdded:{type:Date, required:true},
        DateTaken:{type:Date},
        Caption:{type:String},
        IsDeleted:{type:Boolean, default:false},
        StorageURL:{type:String, required:true}
}, {collection:"Photos", timestamps:true})


module.exports = mongoose.model('Photo', photoSchema)
