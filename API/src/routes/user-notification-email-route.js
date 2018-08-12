'use strict';

const express = require('express');
const router = express.Router();
const userNotificationEmailController = require('../controllers/user-notification-email-controller');

router.post('/', userNotificationEmailController.post);
router.get('/:teste', userNotificationEmailController.get);
router.delete('/:email', userNotificationEmailController.delete);

module.exports = router;
