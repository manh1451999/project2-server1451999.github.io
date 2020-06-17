var express=require('express');
var router= express.Router();
var cartModel= require('../models/cart.model')
var cartController= require('../controller/cart.controller')
var authMiddleware= require('../middleware/auth.middleware')


router.get('/',authMiddleware.isAuth, cartController.getProductCart)
router.post('/updateAmount',authMiddleware.isAuth, cartController.updateAmount)
router.post('/addToCart',authMiddleware.isAuth, cartController.addToCart)
module.exports= router;
