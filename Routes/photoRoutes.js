const express = require('express');
const photoController = require('./../Controllers/photoController');

const router = express.Router();

router.get('/:photoId',photoController.getPhoto);

router.get('/list/:siteId',photoController.getList);

router.put('/:photoId', photoController.updatePhoto);

router.delete('/:photoId', photoController.deletePhoto);

router.post('/create', photoController.createPhoto)

module.exports = router;
