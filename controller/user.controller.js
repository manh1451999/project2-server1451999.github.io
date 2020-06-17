var userModel = require('../models/user.model')

let controller={}


controller.getListUser= async (req, res)=>{
	try{
	let listUser = await userModel.find()
	res.json(listUser);
	}	
	catch(err){
		console.log(err)
		res.status(500).json({ error: err })
	}
}

controller.getUserById= async (req, res)=>{

	try{
	let id= req.params.id
	let user = await userModel.findOne({_id: id});

	res.json(user);
	}	
	catch(err){
		console.log(err)
		res.status(500).json({ error: err })
	}

}



controller.checkUserByEmail= async (req, res)=>{

	try{
	let email= req.email
	let user = await userModel.findOne({email: email})
	if(!user) res.status(404).json("tài khoản không tồn tại");
	res.json(user);
	}	
	catch(err){
		console.log(err)
		res.status(500).json({ error: err })
	}

}





controller.addUser= async (req, res)=>{

	try{

	let userNew = new userModel(req.body)
	 userNew= await userNew.save()
	res.json(userNew);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}
}

controller.deleteUserById= async (req, res)=>{

	try{
	let id= req.params.id
	let userDelete = await userModel.findByIdAndDelete(id)
	res.json(userDelete);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}
}




controller.editUser= async (req, res)=>{

	try{
		let user= new userModel(req.body)
		await user.save()
		res.json(user);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}

	
}



controller.updateUser= async (req, res)=>{

	try{
		let id= req.body._id;
		
		let userUpdate= await userModel.findOneAndUpdate({_id:id}, req.body, {new: true})

		res.json(userUpdate);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}

	
}


module.exports= controller