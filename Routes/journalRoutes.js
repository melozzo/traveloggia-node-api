const express = require('express');
const journalController = require('../Controllers/journalController');

const router = express.Router();

router.get('/list/:siteId', journalController.getList);

router.get('/:journalId', journalController.getJournal);

router.post('/create', journalController.createJournal);

router.delete('/:journalId', journalController.deleteJournal);

router.put('/:jouralId', journalController.updateJournal)


module.exports = router;
