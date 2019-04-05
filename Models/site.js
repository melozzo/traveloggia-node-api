

exports = class Site  {

  

    constructor( lat, long, name, address, description, email, phone, mapId, coverPhoto, links) {
        this.lat = lat;
        this.long = long;
        this.name = name;
        this.address = address;
        this.description = description;
        this.email = email;
        this.phone = phone;
        this.mapId = mapId;
    }

    save() {
        const db = getDb();
        return db.collection('Sites').insertOne( this )
        .then( result => {
            console.log(result)
        })
        .catch( error => {
            console.log(error)
        })
    }

    static getSites( mapId) {
        const db = getDb();
        return db.collection('Sites')
        .find({MapId: mapId})
        .toArray()
        .then( sites => {
            return sites;
        })
        .catch(error => {
            console.log(error)
        });
    }

    getSite( siteId ) {
        const db = getDb();
        return db.collection('Sites')
        .find( {SiteId : siteId})
        .next()
        .then( site => {
            return site;
        })
        .catch(error => {
            console.log(error)
        });
    }
   
}