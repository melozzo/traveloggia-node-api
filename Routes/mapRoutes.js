const express = require('express');
const mapController = require('./../Controllers/mapController');

const router = express.Router();


router.get('/list/:memberId', mapController.getList);

router.get('/:mapId', mapController.getMap);

router.post('/create', mapController.createMap);

router.get('/last/:memberId', mapController.getLastMap);

router.delete('/:mapId', mapController.deleteMap);

router.put('/:mapId', mapController.updateMap)


module.exports = router;
