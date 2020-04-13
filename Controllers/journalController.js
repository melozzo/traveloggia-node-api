const Journal = require('../Models/journal');
const moment = require('moment');


exports.createJournal = (req, res, next ) => {
        const name = req.body.Name;
        const memberId = req.body.MemberID;
        let mapId;
        Map.findOne().sort({"JournalID": -1}).select("JournalID")
        .then( result=>{
                journalId = result.JournalID + 1;
                let journal = new Journal({MemberID:memberId, MapName:name,MapID:mapId, CreateDate:moment().format()});
                map.save()
        })
        .then( result => {
                res.status(201).json(result);
        })
        .catch( error=>{
                console.log(error)
        })
};

exports.getList = ( req, res, next ) => {
        const siteId = req.params.siteId;
        Journal.find({"SiteID":siteId,"IsDeleted": false}).sort({"DateAdded": -1})// unling mongo mongoose doest not return a cursor here, so to array not needed, however need cursor to implement pagination if thats going to be a problem
        .then( journals => {
                res.status(200).json(journals );
        })
        .catch( error => {
        console.log(error)
        })

}

exports.getJournal = (req, res, next)=>{
        const journalId = req.params.journalId;
        //Map.findById(mapId)//only works with object id's mongoose converts string to object id 
        Journal.findOne({"JournalID":journalId, "IsDeleted": false})
        .then( journal => {
                res.status(200).json(journal );
        })
        .catch( error => {
                console.log(error)
        })
}


exports.deleteJournal = ( req,res, next) =>{
        const journalId = req.params.journalId;
        Journal.deleteOne({"MapID":mapId})
        .then( result=>{
                res.status(200).json(result);
        })
        .catch(error=>{
                console.log(error)
        })
}

exports.updateJournal = ( req, res, next) =>{
        const journalId = req.params.journalId;
        const mapName = req.body.MapName;
        const lastUpdated = moment().format();
        const isDeleted = req.body.IsDeleted;
        const  memberId = req.body.MemberID; 
       Journal.findOne({"MapID":req.params.mapId})
        .then( result =>{
                if(!result)
                throw error("map not found")
                result.MapName = mapName;
                result.LastRevision = lastUpdated;
                result.IsDeleted = isDeleted;
                result.MemberID = memberId;
                result.save();
        })
        .then( updatedMap =>{
                res.status(200).json(updatedMap);
        })
        .catch( error =>{
                console.log(error)
        })
       
}