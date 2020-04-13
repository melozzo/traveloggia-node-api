const mongoose = require('mongoose')
const Site = require( './../Models/site');
const moment = require("moment")



exports.getList = ( req, res, next ) => {
    const mapId = req.params.mapId;
    Site.find({"MapID": parseInt(mapId),"IsDeleted":false})
    .then( sites =>{
        res.status(200).json(sites );
    })
    .catch(error => {
        console.log(error)
    })

}

exports.getSite= ( req, res, next)=>{
        const siteId = req.params.siteId

        Site.findOne({"SiteID":siteId})
        .then( site =>{
                return res.status(200).json(site)
        })
        .catch( err=>{
                console.log(err)
        })
}


exports.createSite= ( req, res, next ) =>{
    const lat =Number.parseFloat(req.body.Latitude).toFixed(6);
    const long = req.body.Longitude;
    const name = req.body.Name;
    const description = req.body.Description;
    const mapId = parseInt(req.body.MapID);

    Site.findOne().sort({"SiteID":-1}).select("SiteID")
    .then( result =>{
        let siteId = result.SiteID + 1;
        const site = new Site({
                "SiteID":siteId,
                "MapID":mapId,
                "Latitude":req.body.Latitude, 
                "Longitude":long, 
                "Name":name, 
                "Description":description,
                "DateAdded":moment().format()
                });
        site.save()
        })
        .then( result => {
                res.status(201).json(result)
        })
        .catch(err=> {
                console.log(err);
        })

  

    


}