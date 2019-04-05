const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('./../Util/path');

router.get( '/', ( req, res, next )=> {

   // res.send('<h1 style="color:pink">you are a bunny </h1>');
//handles windows and unix path 
   res.sendFile(path.join(rootDir,  'Views', 'shop.html'));

})


module.exports = router;


