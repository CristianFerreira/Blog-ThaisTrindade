'use strict';

const express = require('express');
const router = express.Router();
const postController = require('../controllers/post-controller');


router.get('/', postController.get);
router.get('/:id', postController.getById);
router.get('/continents/:continent', postController.getByContinent);
router.get('/tags/:tag', postController.getByTag);
router.get('/categoria/:category', postController.getByCategory);
router.post('/', postController.post);
router.put('/:id', postController.put);
router.delete('/', postController.delete);

module.exports = router;
