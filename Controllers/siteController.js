const mongoose = require('mongoose')
const Site = require( './../Models/site');
const moment = require("moment")



exports.getList = ( req, res, next ) => {
    const mapId = req.params.mapId;
    console.log("requested sites for mapId", mapId)
    Site.find({"MapID": mapId,IsDeleted:{ $not:{ $eq:true } }})
    .then( sites =>{
            res.status(200).json(sites );
    })
    .catch(error => {
            res.status(500).json(JSON.stringify(error))
    })

}

exports.getSite= ( req, res, next)=>{
        const siteId = req.params.siteId

        Site.findOne({"SiteID":siteId})
        .then( site =>{
             res.status(200).json(site)
        })
        .catch( err=>{
            res.status(500).json(JSON.stringify(err))
        })
}


exports.createSite= ( req, res, next ) =>{
      console.log("entered create site on node api")
      const mapId = parseInt(req.body.MapID);
      const lat =Number.parseFloat(req.body.Latitude).toFixed(6);
      const long = req.body.Longitude;
      const address = req.body.Address;
      const name = req.body.Name;
      const description = req.body.Description;
      const email = req.body.Email;
      const phone = req.body.Phone;
      const arrival = req.body.Arrival;
      const departure = req.body.Departure;
      const routeIndex = req.body.RouteIndex;
      const url = req.body.URL;

    Site.findOne().sort({"SiteID":-1}).select("SiteID")
    .then( result =>{
            let siteId = result.SiteID + 1;
            const site = new Site({
                "SiteID":siteId,
                "MapID":mapId,
                "Latitude":lat, 
                "Longitude":long, 
                "Address":address,
                "Name":name, 
                "Description":description,
                "DateAdded":moment().format(),
                "Phone":phone,
                "Email":email,
                "Arrival":arrival,
                "Departure":departure,
                "RouteIndex":routeIndex,
                "URL":url
                });
            site.save()
            .then( () => {
                        res.status(201).json(site)
                  })
            .catch(err=> {
                  res.status(500).json({"msg":"failed to mongoose save site to mongo db"})
            })
        })
        .catch(err=> {
            res.status(500).json(JSON.stringify(err))
        })
}

exports.updateSite = ( req, res, next)=>{
      console.log("entered api update site", req.body)
      const siteId = req.params.siteId;
      Site.findOneAndUpdate({SiteID:siteId},{$set: req.body}, (error, result)=>{
            if(error)
                  res.status(500).send(error);
            else {
                  Site.findOne({"SiteID":siteId})
                  .then( site =>{
                          res.status(200).json(site)
                  })
                  .catch( err=>{
                      res.status(500).json(JSON.stringify(err))
                  })

               
            }
                  

      })

}

exports.deleteSite = (req, res, next )=>{
      const siteId = req.params.siteId;
      Site.findOne({SiteID:siteId})
      .then( site =>{
            site.IsDeleted = true;
            site.save()
            .then( (updatedSite)=>{
                  res.status(204).json(updatedSite)
            })
            .catch(err=>{
                  console.log(err)
                  res.status(500).json(JSON.stringify(err))
            })
      })
      .catch(err=>{
            console.log(err)
            res.status(500).json(JSON.stringify(err))
      })
}