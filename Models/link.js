const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
	SiteID:{type:Number, required:true},
	Title:{type:String, required:true},
	URL:{type:String, required:true}
        
}, {collection:"Links", timestamps:true})


module.exports = mongoose.model("Link", linkSchema)