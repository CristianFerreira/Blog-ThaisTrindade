'use strict';

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');

router.post('/', contactController.sendContact);

module.exports = router;
