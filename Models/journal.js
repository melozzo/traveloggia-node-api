const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
        JournalID:{type:Number, required:true},
        SiteID:{type:Number, required:true},
        Text:{type:String},
        Title:{type:String, required:true},
        DateAdded:{type:Date, required:true},
        KeyWords:{type:String},
        IsDeleted:{type:Boolean, default:false}

}, {collection:"Journals"})

module.exports = mongoose.model('Journal',journalSchema)