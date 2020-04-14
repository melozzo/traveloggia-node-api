const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const siteSchema = new Schema({
        SiteID:{type:Number, required:true},
        MapID:{type:Number, required:true},
        Longitude:{type:Number, required:true},
        Latitude:{type:Number,required:true},
        Address:{type:String},
        Name:{type:String, required:true},
        Description:{type:String},
        DateAdded:{type:Date, required:true},
        Phone:{type:String},
        Email:{type:String},
        Arrival:{type:Date},
        Departure:{type:Date},
        RouteIndex:{type:Number},
        URL:{type:String},
        IsDeleted:{type:Boolean}
}, {collection:"Sites", timestamps:true})

module.exports = mongoose.model("Site", siteSchema)