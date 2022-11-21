var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String,
	teamname: String,


	items: [{type: Schema.Types.ObjectId, ref: 'Item'}]

});



ItemSchema = new Schema( {
	
	
	
	createrId:{type:Schema.Types.ObjectId, ref: 'User'},
	
	productname: String,
	description: String,
	price:String,
	totalStock: String
}),

	
Item = mongoose.model('Item', ItemSchema);
User = mongoose.model('User', userSchema);



module.exports = {Item,User};
