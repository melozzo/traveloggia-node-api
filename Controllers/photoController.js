const Photo = require('../Models/Photo');
const moment = require('moment');




// exports.createMap = (req, res, next ) => {
//         const name = req.body.Name;
//         const memberId = req.body.MemberId;
//         let mapId;
//         Map.findOne().sort({"MapID": -1}).select("MapID")
//         .then( result=>{
//                 mapId = result.MapID + 1;
//                 let map = new Map({MemberID:memberId, Name:name,MapID:mapId, CreateDate:moment().toLocaleString()});
//                 map.save()
               
//         })
//         .then( result => {
//                 res.status(201).json(result);
//         })
//         .catch( error=>{
//                 console.log(error)
//         })
// };

exports.getList = ( req, res, next ) => {
        const siteId = req.params.siteId;
        Photo.find({"SiteID":parseInt(siteId),"IsDeleted": false})// unling mongo mongoose doest not return a cursor here, so to array not needed, however need cursor to implement pagination if thats going to be a problem
        .then( photos => {
                res.status(200).json(photos );
        })
        .catch( error => {
                console.log(error)
        })

}

exports.getPhoto = (req, res, next)=>{
        const photoId = req.params.photoId;
        Photo.find({"PhotoID":photoId, "IsDeleted": false})
        .then( photo => {
                res.status(200).json(photo );
        })
        .catch( error => {
                console.log(error)
        })
}


// exports.deleteMap = ( req,res, next) =>{
//         const mapId = req.params.mapId;
//         Map.deleteOne({"MapID":mapId})
//         .then( result=>{
//                 res.status(200).json(result);
//         })
//         .catch(error=>{
//                 console.log(error)
//         })
// }

// exports.updateMap = ( req, res, next) =>{
//         const mapId = req.params.mapId;
//         const mapName = req.body.Name;
//         const lastUpdated = moment().toDate().toLocaleString();
//         const isDeleted = req.body.IsDeleted;
//         const  memberId = req.body.MemberID; 
//         Map.findOne({"MapID":mapId})
//         .then( result =>{
//                 if(!result)
//                 throw error("map not found")
           
//                 result.Name = mapName;
//                 result.LastRevision = lastUpdated;
//                 result.IsDeleted = isDeleted;
//                 result.MemberID = memberId;
//                 result.save();
               

//         })
//         .then( updatedMap =>{
//                 res.status(200).json(updatedMap);
//         })
//         .catch( error =>{
//                 console.log(error)
//         })
       
// }