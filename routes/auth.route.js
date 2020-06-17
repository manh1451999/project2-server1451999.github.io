let express=require('express');
let router= express.Router();
let authController= require('../controller/auth.controller')
let userValidation = require('../validate/user.validate')

router.post('/login',
			userValidation.validationLogin(),
			authController.login)

router.post('/signup', authController.signup)
router.get('/logout', authController.logout)


module.exports= router;