const mongoose = require("mongoose");

//SHEMA Setup
const commentSchema = new mongoose.Schema({
	text: String,
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", commentSchema);