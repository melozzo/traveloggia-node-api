const express = require('express');
const photoController = require('./../Controllers/photoController');

const router = express.Router();


//router.get('/collection/max', photoController.getMax);
//router.get('/:photoId',photoController.getPhoto);

router.post('/create', photoController.createPhoto)

router.get('/list/:siteId',photoController.getList);

router.put('/:photoId', photoController.updatePhoto);

router.delete('/:photoId', photoController.deletePhoto);

router.post('/create', photoController.createPhoto)

module.exports = router;
