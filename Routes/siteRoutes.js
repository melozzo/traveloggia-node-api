const express = require('express');
const siteController = require('./../Controllers/siteController');


const router = express.Router();

router.get('/sites/:mapId', siteController.getSites);

router.get('/site/:siteId', siteController.getSite);

module.exports = router;

