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
	let id=req.user.id;
	let user = await userModel.findOne({_id: id}).lean();
	delete user.isBlock
	delete user.role
	delete user.password

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








controller.updateUserAdmin= async (req, res)=>{

	try{
		let id= req.params.id|| req.body._id
		if(req.body.password) delete req.body.password
		if(req.body.role) delete req.body.role
		let userUpdate= await userModel.findOneAndUpdate({_id:id}, req.body, {new: true})

		res.json(userUpdate);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}

	
}

controller.updateProfile= async (req, res)=>{  //khong sua duoc pass, role, isblock

	try{
		let id= req.user.id;
		
		if(req.body.isBlock) delete req.body.isBlock
		if(req.body.role) delete req.body.role
		if(req.body.password) delete req.body.password
		
		let userUpdate= await userModel.findOneAndUpdate({_id:id}, req.body, {new: true});
		res.cookie('firstName', userUpdate.firstName, {
            maxAge: 60 * 24 * 60 * 60,
        })

		res.json(userUpdate);
	}
	catch(err){
		console.log(err);
		res.status(500).json({ error: err })
	}

	
}


module.exports= controller