var orderModel = require('../models/order.model')
var categoryModel = require('../models/category.model')

let controller={}

controller.getListOrder= async (req, res)=>{
	try{
	let listOrder = await orderModel.find().populate('user', 'email');
	res.json(listOrder);
	}	
	catch(err){
		res.status(500).json({ error: err })
	}
}

controller.getOrderByUser= async (req, res)=>{
	try{
	
	let id= req.user.id;
	let order = await orderModel.find({user: id}).populate('user', 'email');
	res.json(order);

	}	
	catch(err){
		console.log(err)
		res.status(500).json({ error: err })
	}
}

controller.upadteStatus= async (req, res)=>{
	try{

		let status= req.body.status;
		let orderId= req.body._id;



		let orderUpdate = await orderModel.findOneAndUpdate({_id:orderId}, {status: status}, {new: true});

		res.json(orderUpdate)




	}	
	catch(err){
		console.log(err)
		res.status(500).json({ error: err })
	}
}


module.exports= controller