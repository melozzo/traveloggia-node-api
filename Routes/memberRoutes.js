const express = require('express');
const memberController = require("./../Controllers/memberController");

const router= express.Router();


router.post('/login', memberController.login);

router.post('/create',memberController.create);

// router.delete('/:memberId');

// router.put('/:memberId')

module.exports = router;

