const Photo = require('../Models/Photo');
const moment = require('moment');


exports.createPhoto = (req, res, next ) => {
        const siteId = req.body.SiteID;
        const fileName = req.body.FileName;
        const dateTaken = req.body.dateTaken;
        const storageUrl = req.body.StorageURL;
        const caption = req.body.Caption;
        const isDeleted = req.body.IsDeleted;

        Photo.findOne().sort({"PhotoID": -1}).select("PhotoID")
        .then( result=>{
                let photoId = result.PhotoID + 1;
                let photo = new Photo({
                      PhotoID:photoId,
                      SiteID: siteId,
                      FileName:fileName,
                      StorageURL:storageUrl,
                      DateTaken:dateTaken,
                      Caption:caption,
                      DateAdded:moment().toLocaleString()}),
                      IsDeleted = isDeleted
                photo.save();
        })
        .then( result => {
                res.status(201).json(result);
        })
        .catch( error=>{
                res.status(500).json(JSON.stringify(error))
        })
};

exports.getList = ( req, res, next ) => {
        const siteId = req.params.siteId;
        Photo.find({"SiteID":parseInt(siteId),IsDeleted:{ $not:{ $eq:true } }})// unling mongo mongoose doest not return a cursor here, so to array not needed, however need cursor to implement pagination if thats going to be a problem
        .then( photos => {
                res.status(200).json(photos );
        })
        .catch( error => {
            res.status(500).json(JSON.stringify(err))
        })

};

exports.getPhoto = (req, res, next)=>{
        const photoId = req.params.photoId;
        Photo.find({"PhotoID":photoId, IsDeleted:{ $not:{ $eq:true } }})
        .then( photo => {
                res.status(200).json(photo );
        })
        .catch( error => {
            res.status(500).json(JSON.stringify(err))
        })
};

exports.updatePhoto = ( req, res, next) =>{
      const photoId = req.params.photoId;
      const siteId = req.body.SiteID;
      const fileName = req.body.FileName;
      const dateTaken = req.body.dateTaken;
      const storageUrl = req.body.StorageURL;
      const caption = req.body.Caption;
      const isDeleted = req.body.IsDeleted;
        Site.findOne({"SiteID":siteId})
        .then( result =>{
            result.SiteID = siteId;
            result.FileName = fileName;
            result.StorageURL = storageUrl;
            result.DateTaken = dateTaken;
            result.Caption = caption;
            result.IsDeleted = isDeleted;
            result.save();
        })
        .then( updatedPhoto =>{
                res.status(204).json(updatedPhoto);
        })
        .catch( error =>{
                res.status(500).json(JSON.stringify(error))
        })
       
};

exports.deletePhoto = ( req, res, next )=>{
      photoId = req.params.photoId;
      Photo.update({PhotoID:photoId}, {$set:{IsDeleted:true}})
      .then( ()=>{
            res.status(200)
      })
      .catch(err=>{
            res.status(500).json(JSON.stringify(err))
      })
};