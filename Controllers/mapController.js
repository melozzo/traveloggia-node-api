const Map = require('./../Models/map');
const moment = require('moment');


exports.createMap = (req, res, next ) => {
        const name = req.body.Name;
        const memberId = req.body.MemberId;
        let mapId;
        Map.findOne().sort({"MapID": -1}).select("MapID")
        .then( result=>{
                mapId = result.MapID + 1;
                let map = new Map({MemberID:memberId, Name:name,MapID:mapId, CreateDate:moment().format()});
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
        const memberId = req.params.memberId;
        console.log(memberId)
        Map.find({"MemberID":memberId,"IsDeleted": false}).sort({"CreateDate": -1})// unling mongo mongoose doest not return a cursor here, so to array not needed, however need cursor to implement pagination if thats going to be a problem
        .then( maps => {
                res.status(200).json(maps );
        })
        .catch( error => {
        console.log(error)
        })

}

exports.getMap = (req, res, next)=>{
        const mapId = req.params.mapId;
        console.log("requested map id" ,mapId)
        //Map.findById(mapId)//only works with object id's mongoose converts string to object id 
        Map.find({"MapID":mapId, "IsDeleted": false})
        .then( map => {
                res.status(200).json(map );
        })
        .catch( error => {
                console.log(error)
        })
}

exports.getAll = (req, res, next)=>{
     
        Map.find()// mongoose converts string to object id 
        .then( maps => {
                res.status(200).json(maps);
               
        })
        .catch( error => {
                console.log(error)
        })
}

exports.getLastMap = ( req, res, next ) => {
        const memberId = req.params.memberId;
        Map.findOne({"MemberID":memberId}).sort({"CreateDate":-1})
        .then( map => {
                res.status(200).json(map);
        })
        .catch( error => {
        console.log(error)
        })
}

exports.deleteMap = ( req,res, next) =>{
        const mapId = req.params.mapId;
        Map.deleteOne({"MapID":mapId})
        .then( result=>{
                res.status(200).json(result);
        })
        .catch(error=>{
                console.log(error)
        })
}

exports.updateMap = ( req, res, next) =>{
        const mapId = req.params.mapId;
        const mapName = req.body.Name;
        const lastUpdated = moment().toDate().toLocaleString();
        const isDeleted = req.body.IsDeleted;
        const  memberId = req.body.MemberID; 
        Map.findOne({"MapID":mapId})
        .then( result =>{
                if(!result)
                throw error("map not found")
           
                result.Name = mapName;
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