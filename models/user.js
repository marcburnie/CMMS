const 	mongoose 				= require('mongoose'),
		passportLocalMongoose	= require('passport-local-mongoose');

//SHEMA Setup
const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	created: {type: Date, default: Date.now}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);