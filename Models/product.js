const getDB = require('./../Util/database').getDb



class Product {

    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        db.collection('Products').insertOne( this )
        .then( result => {
            console.log(result)
        })
        .catch( error => {
            console.log(error)
        })
    }

}