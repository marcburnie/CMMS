const mongoose = require("mongoose");

//SHEMA Setup
const assetSchema = new mongoose.Schema({
	fc: String,
	img: String,
	description: String,
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Asset", assetSchema);