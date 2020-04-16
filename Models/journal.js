const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
        JournalID:{type:Number, required:true},
        SiteID:{type:Number},
        Text:{type:String},
        Title:{type:String},
        JournalDate:{type:Date},
        DateAdded:{type:Date,},
        KeyWords:{type:String},
        IsDeleted:{type:Boolean, default:false},
        MemberID:{type:Number}

}, {collection:"Journals", timestamps:true})

module.exports = mongoose.model('Journal',journalSchema)