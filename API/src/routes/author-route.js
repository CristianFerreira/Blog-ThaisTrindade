'use strict';

const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author-controller');
const authService = require('../services/auth-service');


router.get('/', authorController.get);
router.get('/:id', authorController.getById);
router.post('/', authorController.post);
router.put('/:id', authService.authorize, authorController.put);
router.delete('/', authService.isAdmin, authorController.delete);
router.post('/authenticate', authorController.authenticate);
router.post('/refresh-token', authService.authorize, authorController.refreshToken);
router.post('/verify-token', authorController.verifyToken);

module.exports = router;
