const express = require('express');
const testController = require('../controllers/testController');

const testRouter = express.Router();

testRouter.post('/post', testController.test_post);

module.exports = testRouter;