const express = require('express');
const siteController = require('./../Controllers/siteController');


const router = express.Router();

router.get('/list/:mapId', siteController.getList);

router.get('/:siteId', siteController.getSite);
router.post('/update', siteController.updateSite);
//router.post('/create', siteController.createSite);



router.delete('/:siteId', siteController.deleteSite)

module.exports = router;

