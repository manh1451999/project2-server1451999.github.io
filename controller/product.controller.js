var productModel = require('../models/product.model')

let controller={}


controller.getListProduct= async (req, res)=>{
	try{
	let listProduct = await productModel.getListProduct()
	res.json(listProduct);
	}	
	catch(err){
		console.log(err)
		res.status(500).json({ error: err })
	}
}

controller.getProductById= async (req, res)=>{

	try{
	let id= req.params.id
	let product = await productModel.findOne({_id: id}).populate('category')
	res.json(product);
	}	
	catch(err){
		console.log(err)
		res.status(500).json({ error: err })
	}

}




controller.addProduct= async (req, res)=>{

	try{

	let productNew = new productModel(req.body)
	 productNew= await productNew.save()
	res.json(productNew);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}
}

controller.deleteProductById= async (req, res)=>{

	try{
	let id= req.params.id
	let productDelete = await productModel.findByIdAndDelete(id)
	res.json(productDelete);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}
}




controller.editProduct= async (req, res)=>{

	try{
		let product= new productModel(req.body)
		await product.save()
		res.json(product);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}

	
}



controller.updateProduct= async (req, res)=>{

	try{
		let id= req.body._id;
		
		let productUpdate= await productModel.findOneAndUpdate({_id:id}, req.body, {new: true})

		res.json(productUpdate);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}

	
}


module.exports= controller