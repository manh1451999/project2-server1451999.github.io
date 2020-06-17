var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var orderSchema= new Schema({
	userName: String,
	address: String,
	status: {
		type:Number,
		default: 0
	}, 
	listProduct:[{
		product: {
			name: String,
			imgUrl: String,
			summary: String,
			description: String,
			prict: String
		},
		amount: Number
	}]
})

module.exports= mongoose.model('orders', orderSchema)
