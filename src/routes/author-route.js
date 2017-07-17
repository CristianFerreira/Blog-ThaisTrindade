'use strict';

const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author-controller');


router.get('/', authorController.get);
router.get('/:id', authorController.getById);
router.post('/', authorController.post);
router.put('/:id', authorController.put);
router.delete('/', authorController.delete);

module.exports = router;
