const express = require('express');
const photoController = require('./../Controllers/photoController');

const router = express.Router();

router.get('/:photoId',photoController.getPhoto);

router.get('/list/:siteId',photoController.getList);

module.exports = router;
