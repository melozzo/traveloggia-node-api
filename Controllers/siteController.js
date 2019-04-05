const getDb = require('./../Util/database').getDb;
const Site = require( './../Models/site');



exports.getSites = ( req, res, next ) => {
    const mapId = req.params.mapId;
    Site.getSites(mapId)
    .then( sites =>{

    })
    .catch(error => {
        
    })

}



exports.addSite= ( req, res, next ) =>{
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