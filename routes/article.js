const express = require('express');
const articleController = require('../controllers/articleController');
const uuid = require('uuid').v4;


const router = express.Router();



// router.get('/', articleController.getAll);
router.post('/create', articleController.create);
router.get('/:id', articleController.read);

module.exports = router;