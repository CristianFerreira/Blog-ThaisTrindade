'use strict';

const express = require('express');
const router = express.Router();
const postController = require('../controllers/post-controller');
const authService = require('../services/auth-service');


router.get('/', postController.get);
router.get('/inactive/', postController.getInactive);
router.get('/:id', postController.getById);
router.get('/continents/getAll/', postController.getAllContinents);
router.get('/continent/:continent', postController.getByContinent);
router.get('/tag/:tag', postController.getByTag);
router.get('/tags/getAll/', postController.getAllTags);
router.get('/categoria/:category', postController.getByCategory);
router.post('/', authService.authorize, postController.post);
router.put('/', authService.authorize, postController.put);
router.delete('/:id', authService.authorize, postController.delete);

module.exports = router;
