var cartModel= require('./models/cart.model.js');
var productModel= require('./models/product.model.js');
var userModel= require('./models/user.model.js');
var categoryModel= require('./models/category.model.js');


module.exports= async function(){

try{

let cartNew = new cartModel();
let user = await userModel.findOne().lean()   //lean de co the them cac thuoc tinh khac
let products = await productModel.find().populate('category')
let categories = await categoryModel.find();
let cart = await cartModel.findOne().populate([
												{'path':'listProduct.product',
													'populate': 'category'
												},
												{'path':'user',
												  'select':'email'
												}
												
											])

// console.log(user)

// console.log(cart.listProduct[0])

// for(let i=1; i<=30;i++){
// 	let product=new productModel();
	
// }

}
catch(err){
	console.log(err)
}
}
