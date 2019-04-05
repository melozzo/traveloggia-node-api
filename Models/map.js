const getDb = require('./../Util/database').getDb;
const Moment = require('moment');


module.exports = class Map {

    constructor( memberId,  name) {
        this.MemberId = memberId;
        this.Name = name;
        this.createDate = Moment().toDate();
        this.isDeleted = false;
    }

   save() {
        const db = getDb();
        return db.collection('Maps')
        .insertOne( this)
        .then( result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
    }

   // static getList( memberId ) {
        // const db = getDb();
        // return db.collection('Maps')
        // .find({memberID: memberId })
        // .sort({"createDate": -1})// -1 desc, 1 assc
        // .toArray()
        // .then( maps => {
        //     return maps
        // })
        // .catch( error => {
        //     console.log(error)
        // })
   // }


   // static getLastMap( memberId ) {
        // const db = getDb();
        // return db.collection('Maps')
        // .find({memberID: memberId })
        // .sort({"createDate": -1})// -1 desc, 1 assc
        // .limit(1)
        // .next()
        // .then( map => {
        //     return map
        // })
        // .catch( error => {
        //     console.log(error)
        // })
   // }




}