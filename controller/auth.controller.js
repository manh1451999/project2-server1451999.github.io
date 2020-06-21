let userModel = require('../models/user.model');
var {validationResult} = require('express-validator');

let bcrypt= require('bcryptjs')
const jwtMethod= require('../jsonwebtoken/jwt.method');

const accessTokenLife= process.env.ACCESS_TOKEN_LIFE || "1h";
const acesssSecretKey= process.env.ACCESS_TOKEN_SECRET || "Manh.1451999";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET || "Manh.1451999-Refesh";


let auth={}

auth.login = async (req, res)=>{
	try{

		 const errors = validationResult(req);

		  if (!errors.isEmpty()) {
		    res.status(422).json({ errors: errors.array().map((err)=>err.msg)});
		    return;
		  }

		let user= req.body.user;
		const checkUser= await userModel.findOne({email: user.email}).lean();

		if(!checkUser) res.status(400).json({
			message: "email hoặc mật khẩu không đúng"
		})

		const checkPass=await bcrypt.compare(user.password, checkUser.password )

		delete checkUser.password

		if(!checkPass) res.status(400).json({
			message: "email hoặc mật khẩu không đúng"
		})

		if(checkUser.isBlock) res.status(400).json({
			message: "tài khoản đã bị khoá"
		})


		const accessToken = await jwtMethod.generateToken({id:checkUser._id, email: checkUser.email}, acesssSecretKey, accessTokenLife);
		const refreshToken = await jwtMethod.generateToken({id:checkUser._id, email: checkUser.email}, refreshSecretKey, refreshTokenLife);


		res.cookie('access_token', accessToken, {
            maxAge: 60 * 24 * 60 * 60,
            httpOnly: true,
            //secure: true;
        })

        res.cookie('firstName', checkUser.firstName, {
            maxAge: 60 * 24 * 60 * 60,
        })


		return res.status(200).json({
			message: "success",
			access_token: accessToken
		})
		 // return res.status(200).json({accessToken, refreshToken});
	}
	catch(err){
		res.status(500).json({err:err})
	}


}



auth.logout=async (req, res)=> {
	try{

		let user= req.body.user;

		res.clearCookie('access_token');
		res.clearCookie('firstName');
		res.clearCookie('isAdmin');

		res.json({message: "logout success"})

	}
	catch(err){
		console.log(err);
		res.status(500).json({message: err})
	}
}



auth.signup=async (req, res)=> {
	try{

		let user= req.body.user;

		let checkUser= await  userModel.findOne({email: user.email})



		if(checkUser) res.status(500).json({message: "tài khoản đã tồn tại"});

		let newUser= new userModel(user);

		const salt= await bcrypt.genSalt(10);
		newUser.password= await bcrypt.hash(newUser.password, salt);

		newUser= await newUser.save();

		console.log(newUser)

		res.json({message: "đã đăng ký thành công"})

	}
	catch(err){
		res.status(500).json({message: err})
	}
}



auth.loginAdmin = async (req, res)=>{
	try{

		 const errors = validationResult(req);

		  if (!errors.isEmpty()) {
		    res.status(422).json({ errors: errors.array().map((err)=>err.msg)});
		    return;
		  }

		let user= req.body.user;
		const checkUser= await userModel.findOne({email: user.email}).lean();

		if(!checkUser) res.status(400).json({
			message: "email hoặc mật khẩu không đúng"
		})

		const checkPass=await bcrypt.compare(user.password, checkUser.password )

		delete checkUser.password

		if(!checkPass) res.status(400).json({
			message: "email hoặc mật khẩu không đúng"
		})

		if(checkUser.isBlock) res.status(400).json({
			message: "tài khoản đã bị khoá"
		})

		if(checkUser.role!=2) res.status(400).json({
			message: "bạn không thể đăng nhập dưới quyền quản trị viên"
		})


		const accessToken =  await jwtMethod.generateToken({id:checkUser._id, email: checkUser.email, role: checkUser.role}, acesssSecretKey, accessTokenLife);
		const refreshToken = await jwtMethod.generateToken({id:checkUser._id, email: checkUser.email,role: checkUser.role}, refreshSecretKey, refreshTokenLife);


		res.cookie('access_token', accessToken, {
            maxAge: 60 * 24 * 60 * 60,
            httpOnly: true
            //secure: true;
        })

        res.cookie('firstName', checkUser.firstName, {
            maxAge: 60 * 24 * 60 * 60
        })

        res.cookie('isAdmin', true, {
            maxAge: 60 * 24 * 60 * 60
        })



		return res.status(200).json({
			message: "success",
			access_token: accessToken
		})
		 // return res.status(200).json({accessToken, refreshToken});
	}
	catch(err){
		res.status(500).json({err:err})
	}


}




module.exports= auth


