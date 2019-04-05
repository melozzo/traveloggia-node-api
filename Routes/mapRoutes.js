const express = require('express');
const mapController = require('./../Controllers/mapController');


const router = express.Router();

router.get('/dummy', mapController.dummy);

router.post('/create', mapController.createMap)

 router.get('/list/:memberId', mapController.getList )

 router.get('/last/:memberId', mapController.getLastMap )



module.exports = router;
