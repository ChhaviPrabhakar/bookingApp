// const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/add-user', userController.postAddUser);
router.get('/get-user', userController.getUser);
router.delete('/delete-user/:id', userController.postDeleteUser);

module.exports = router;