const Map = require('./../Models/map');


exports.dummy = (req, res, next ) => {
  res.status(200).json({
    posts: [{ title: 'First Post', content: 'This is the first post!' }]
  });
}

exports.createMap = (req, res, next ) => {
   const name = req.body.name;
   const memberId = req.body.memberId;
   let map = new Map(memberId, name);
   map.save()
   .then( result => {
    res.status(201).json({ message:  name, id: memberId});
   })
  
  

  
};

exports.getList = ( req, res, next ) => {
   // const memberId = req.params.memberId;
   // Map.getList(memberId)
   // .then( maps => {
         res.status(200).json( {message: 'thats the list'} );
  //  })
   // .catch( error => {
        console.log(error)
   // })

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