const express = require('express');
const siteController = require('./../Controllers/siteController');


const router = express.Router();

router.get('/list/:mapId', siteController.getList);

router.get('/:siteId', siteController.getSite);

module.exports = router;

