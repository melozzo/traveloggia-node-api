const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    // db name is in the connection string - creates it if doesnt exist yet
    MongoClient.connect('mongodb+srv://Anemone:traveloggia_256@cluster0-9kdvr.mongodb.net/traveloggia?retryWrites=true' , { useNewUrlParser: true })
    .then( client => {
        console.log('connected')
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

