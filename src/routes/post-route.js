'use strict';

const express = require('express');
const router = express.Router();
const postController = require('../controllers/post-controller');


router.get('/', postController.get);
router.post('/', postController.post);
router.put('/:id', postController.put);
router.delete('/', postController.delete);



module.exports = router;
