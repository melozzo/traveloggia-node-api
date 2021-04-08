const Photo = require('./../Models/photo');
const moment = require('moment');
const { response } = require('express');


exports.createPhoto = async (req, res, next)=>{
    
            Photo.findOne().sort({"PhotoID":-1})
            .then( record =>{
                  const nextID = record.PhotoID + 1;
                  const siteId = req.body.SiteID;
                  const fileName = req.body.FileName;
                  const storageURL = req.body.StorageURL
                  const deviceStorageUrl = req.body.DeviceStorageURL;

                  const photo = new Photo({
                        PhotoID:nextID,
                        SiteID: siteId,
                        FileName:fileName,
                        DeviceStorageURL:deviceStorageUrl,
                        StorageURL:storageURL,
                        DateTaken:moment().format(),
                        DateAdded:moment().format(),
                  })
                  
                  photo.save()
                  .then( ()=>{
                        res.json(photo)
                  })
                  

            })
            .catch(error=>{
                  console.log("no dice",error.message)
                  res.json(JSON.stringify(error))
            })
           
    
 
};

exports.getMax = (req, res, next)=>{
      console.log("get max id called")
      Photo.findOne().sort({"PhotoID":-1})
      .then( record =>{
            console.log(`max photoID found ${record.PhotoID}`)
            res.json(record)
      })
      .catch(error=>{
            console.log("no dice",error.message)
      })
}

exports.getList = ( req, res, next ) => {
        const siteId = req.params.siteId;
        Photo.find({"SiteID":parseInt(siteId),IsDeleted:{ $not:{ $eq:true } }})
        .then( photos => {
              if(photos.length === 0)
              console.log("zero photos for this site")
                res.status(200).json(photos );
        })
        .catch( error => {
              console.log(error)
            res.status(500).json(JSON.stringify(error))
        })
};

exports.getPhoto = (req, res, next)=>{
        const photoId = req.params.photoId;
        Photo.find({"PhotoID":photoId, IsDeleted:{ $not:{ $eq:true } }})
        .then( photo => {
                res.status(200).json(photo );
        })
        .catch( error => {
            res.status(500).json(JSON.stringify(error))
        })
};

exports.updatePhoto = ( req, res, next) =>{
      const photoId = req.params.photoId;
      const siteId = req.body.SiteID;
      const fileName = req.body.FileName;
      const dateTaken = req.body.dateTaken;
      const storageUrl = req.body.StorageURL;
      const deviceStorageUrl = req.body.DeviceStorageURL;
      const caption = req.body.Caption;
      const isDeleted = req.body.IsDeleted;
      const orientation = req.body.orientationID;
      
       Photo.findOne({"PhotoID":photoId})
        .then( result =>{
            result.SiteID = siteId;
            result.FileName = fileName;
            result.StorageURL = storageUrl;
            result.DeviceStorageURL = deviceStorageUrl;
            result.DateTaken = dateTaken;
            result.Caption = caption;
            result.IsDeleted = isDeleted;
            result.orientationID = orientation;
            result.save()
            .then( updatedPhoto =>{
                  res.status(204).json(updatedPhoto);
          })
          .catch( error =>{
                  res.status(500).json(JSON.stringify(error))
          })
        })
       
        .catch( error =>{
                res.status(500).json(JSON.stringify(error))
        })
       
};

exports.deletePhoto = ( req, res, next )=>{
     const id = req.params.photoId;
      console.log("photo to detel is ",id)
      Photo.findOne({"PhotoID":id})
      .then( result =>{
            result.IsDeleted = true;
            result.save()
            .then( updatedPhoto =>{
            res.status(204).json(updatedPhoto);
            })
            .catch( error =>{
                  res.status(500).json(JSON.stringify(error))
            })
      })
      .catch( error =>{
                res.status(500).json(JSON.stringify(error))
        })
};