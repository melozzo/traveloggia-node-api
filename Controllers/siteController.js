const mongoose = require('mongoose')
const Site = require( './../Models/site');



exports.getList = ( req, res, next ) => {
    const mapId = req.params.mapId;
    Site.find({"MapID": parseInt(mapId)})
    .then( sites =>{
        res.status(200).json(sites );
    })
    .catch(error => {
        console.log(error)
    })

}

exports.getSite= ( req, res, next)=>{
        const siteId = req.params.siteId

        Site.find({"SiteID":siteId})
        .then( site =>{
                return res.status(200).json(site)
        })
        .catch( err=>{
                console.log(err)
        })


}


exports.createSite= ( req, res, next ) =>{
    const lat = req.body.lat;
    const long = req.body.long;
    const name = req.body.name;
    const description = req.body.description;



    const site = new Site(lat, long, name, description);
    site.save()
    .then( result => {
        console.log("site has been added");
    })
    .catch(err=> {
        console.log(err);
    })

    


}