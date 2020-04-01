const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

// this db connection is for mongo hosted by mongo atlas
//'mongodb+srv://Anemone:traveloggia_256@cluster0-9kdvr.mongodb.net/traveloggia?retryWrites=true' , { useNewUrlParser: true })
// reseller of aws or azure or google hosting services
// but it costs money - try for free of course
// so instead we are going to host mongo along with the node api
// in digital ocean which we are paying for...
// when we scale to empire, we can pay for db hosting service for now we will host our own 


const mongoConnect = (callback) => {
    // db name is in the connection string - creates it if doesnt exist yet
    MongoClient.connect('mongodb://mongo:27017/traveloggiaDB')
    .then( client => {
        console.log('mongo traveloggiaDB connected')
        // you can pass in the name of the db you want to use

        _db = client.db()
        callback();
    })
    .catch( error => {
        console.log(error);
        throw error;
    })
}

const getDb = () => {
    if (_db)
        return _db;
  
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;

