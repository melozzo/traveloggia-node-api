const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const siteSchema = new Schema({
        SiteID:{type:Number, required:true},
        MapID:{type:Number, required:true},
        Longitude:{type:Number, required:true},
        Latitude:{type:Number,required:true},
        Name:{type:String, required:true},
        DateAdded:{type:Date, required:true},
        Phone:{type:String},
        Email:{type:String},
        Address:{type:String},
        Arrival:{type:Date},
        Departure:{type:Date},
        RouteIndex:{type:Number},
        URL:{type:String}
}, {collection:"Sites"})

module.exports = mongoose.model("Site", siteSchema)