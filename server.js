
const express = require('express');
const bodyParser = require('body-parser');
//const path = require('path');
const mapRoutes = require('./Routes/mapRoutes');
//const siteRoutes = require('./Routes/siteRoutes');
const mongoConnect = require('./Util/database').mongoConnect;



const expressApp = express();
// parser middle ware goes first
// calls next by automatically allowing access to body key pairs
//expressApp.use(bodyParser.urlencoded({extended: false})); // for forms

expressApp.use(bodyParser.json());  // because we will communicate with rest api posting json, not forms

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// bypass routintg system - path refers to file system used for static files like css
//expressApp.use(express.static(path.join(__dirname ,'public' )))

expressApp.use('/map', mapRoutes);

mongoConnect( client => {
    expressApp.listen(3060);

})


//expressApp.use('/site', siteRoutes);


//use is express method to add middleware =  ( request handlers )
// multiple middle where handlers can be added next passes the request on to the next  
// middle ware defined in code - if there is no more next, send the response back
// expressApp.use( ( req, res, next )=> {
//     console.log("in the first middleware")
//     next();
// })

//Mounts the specified middleware function or functions 
//at the specified path: the middleware function is executed when the base of the requested path matches path.

//expressApp.use(shopRoutes);

// expressApp.use( (req, res,next)=> {
//    // res.status(404).send('<h1 style="color:lightgreen">page not found</h1>')

//    res.status(404).sendFile(path.join(__dirname, 'Views', '404.html'))

// });

//expressApp.listen(3060);



// // any request with this path
// // expressApp.use('/product', (req, res, next) => {
//    console.log(req.body);
//     res.redirect('/');
// })

// only triggers for get requests with this path
// expressApp.get('/product', (req, res, next) => {
//     console.log(req.body);
//      res.redirect('/');
//  })

 // only for post request with this path
// expressApp.post('/product', (req, res, next) => {
//     console.log(req.body);
//      res.redirect('/');
//  })
 

// expressApp.use( '/', ( req, res, next )=> {
//     console.log("in the second middleware ");
//     res.send('<h1 style="color:pink">you are a bunny </h1>');

// })





