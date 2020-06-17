var cartModel = require('../models/cart.model')
var productModel = require('../models/product.model')

const controller={};

controller.getProductCart= async (req, res)=>{

	try{


	let userId= req.user.id




	let listCartProduct= await cartModel.findOne({user: userId}).populate('listProduct.product');



	res.json(listCartProduct.listProduct)
	}
	catch(err){
		res.status(500).json(err)
	}

}

controller.updateAmount= async  (req, res)=>{

	try{

	let amount= req.body.amount;
	let productId=req.body.product._id
	let userId= req.user.id
	let CartProduct= await cartModel.findOne({user: userId});

	var index1
	 CartProduct.listProduct.forEach(async (elment, index)=>{
		if(elment.product== productId) {
			CartProduct.listProduct[index].amount=amount;
			index1=index
		}
	});

	CartProduct= await CartProduct.save();
			

	
	res.json(CartProduct.listProduct[index1])


	}
	catch(err){
		res.status(500).json({err: err})
	}

}


controller.addToCart= async (req, res)=>{


	try{

	var amount= req.body.amount;
	var productId=req.body.productId
	let userId= req.user.id
	let CartProduct= await cartModel.findOne({user: userId});

	var index1=-1
	 CartProduct.listProduct.forEach(async (elment, index)=>{
		if(elment.product== productId) {
			CartProduct.listProduct[index].amount+=amount;
			index1=index
		}
	});


	if(index1==-1){   // chua co san pham trong gio
		let product= await productModel.findOne({_id: productId});
		productId= product._id;
		CartProduct.listProduct.push({
			product: productId,
			amount: amount

		})
	}



	CartProduct= await CartProduct.save();





	
	res.json(CartProduct.listProduct)


	}
	catch(err){
		res.status(500).json({err: err})
	}

}










module.exports=  controller