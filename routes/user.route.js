var express=require('express');
var router= express.Router();
var userModel= require('../models/user.model')
var userController= require('../controller/user.controller')


router.get('/', userController.getListUser)
router.get('/:id', userController.getUserById)
router.delete('/:id', userController.deleteUserById)
router.post('/', userController.addUser)
router.patch('/:id', userController.updateUser)


module.exports= router;