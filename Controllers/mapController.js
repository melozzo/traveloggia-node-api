const Map = require('./../Models/map');
const moment = require('moment');

exports.dummy = (req, res, next ) => {
  res.status(200).json({
    posts: [{ title: 'First Post', content: 'This is the first post!' }]
  });
}

exports.beHappy= ( req, res, next)=>{
        let message = Map.getList();
        res.status(200).json({
                data:[{bunnies:message}]
        });
}

exports.createMap = (req, res, next ) => {
   const name = req.body.Name;
   const memberId = req.body.MemberId;
   let mapId;
   Map.findOne().sort({"MapID": -1}).select("MapID").then( result=>{
       mapId = result.MapID + 1;
       let map = new Map({MemberID:memberId, Name:name,MapID:mapId, CreateDate:moment().toLocaleString()});
       map.save()
       .then( result => {
            res.status(201).json(result);
       })
   })
   .catch( error=>{
           console.log(error)
   })
 
};



exports.getList = ( req, res, next ) => {
   const memberId = req.params.memberId;
   console.log(memberId)
   Map.getList(memberId)
   .then( maps => {
         res.status(200).json(maps );
   })
   .catch( error => {
        console.log(error)
   })

}

exports.getLastMap = ( req, res, next ) => {
    const memberId = req.params.memberId;
  //  Map.getLastMap(memberId)
    //.then( map => {
        res.status(200).json({message: 'you suck'});
   // })
   // .catch( error => {
     //   console.log(error)
   // })

}