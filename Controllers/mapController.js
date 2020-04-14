const Map = require('./../Models/map');
const moment = require('moment');


exports.createMap = (req, res, next ) => {
        const name = req.body.Name;
        const memberId = req.body.MemberID;
        let mapId;
        Map.findOne().sort({"MapID": -1}).select("MapID")
        .then( result=>{
                mapId = result.MapID + 1;
                let map = new Map({MemberID:memberId, MapName:name,MapID:mapId, CreateDate:moment().format()});
                map.save()
        })
        .then( result => {
                res.status(201).json(result);
        })
        .catch( error=>{
            res.status(500).json(JSON.stringify(err))
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
            res.status(500).json(JSON.stringify(err))
        })

}

exports.getMap = (req, res, next)=>{
        const mapId = req.params.mapId;
        console.log("requested map id" ,mapId)
        //Map.findById(mapId)//only works with object id's mongoose converts string to object id 
        Map.findOne({"MapID":mapId, "IsDeleted": false})
        .then( map => {
                res.status(200).json(map );
        })
        .catch( error => {
            res.status(500).json(JSON.stringify(err))
        })
}

exports.getLastMap = ( req, res, next ) => {
        const memberId = req.params.memberId;
        Map.findOne({"MemberID":parseInt(memberId)}).sort({"CreateDate":-1})
        .then( map => {
                res.status(200).json(map);
        })
        .catch( error => {
            res.status(500).json(JSON.stringify(err))
        })
}



exports.updateMap = ( req, res, next) =>{
        const mapId = req.params.mapId;
        const mapName = req.body.MapName;
        const lastUpdated = moment().format();
        const isDeleted = req.body.IsDeleted;
        const  memberId = req.body.MemberID; 
        Map.findOne({"MapID":req.params.mapId})
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
                res.status(204).json(updatedMap);
        })
        .catch( error =>{
            res.status(500).json(JSON.stringify(err))
        })
       
}

exports.deleteMap = ( req,res, next) =>{
      const mapId = req.params.mapId;
      Map.update({"MapID":mapId}, {$set : {IsDeleted:true}})
      .then( result=>{
              res.status(200).json(result);
      })
      .catch(error=>{
          res.status(500).json(JSON.stringify(err))
      })
}