'use strict';

const express = require('express');
const router = express.Router();
const contactEmailController = require('../controllers/contact-email-controller');

router.post('/', contactEmailController.post);
router.get('/', contactEmailController.get);
router.delete('/', contactEmailController.delete);

module.exports = router;
