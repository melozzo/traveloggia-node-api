const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('./../Util/path');

router.get('/add-product', (req, res, next) => {
    console.log(req.body);
   //  res.send('<form action="/admin/product"  method="POST"><input type="text" name="title"><button type="submit">ADD PRODUCT</button></form>')
    res.sendFile(path.join(rootDir, 'Views', 'add-product.html'))

})


router.post('/product', (req, res, next) => {
    console.log(req.body);
     res.redirect('/');
 })
 


module.exports = router;