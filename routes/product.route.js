var express=require('express');
var router= express.Router();
var productModel= require('../models/product.model')
var productController= require('../controller/product.controller')

router.get('/', productController.getListProduct)
router.get('/:id', productController.getProductById)
router.delete('/:id', productController.deleteProductById)
router.post('/', productController.addProduct)
router.patch('/:id', productController.updateProduct)


module.exports= router;