const mongoose = require("mongoose");
const Asset = require("./models/asset");
const Comment = require("./models/comment");

const data = [
	{fc: "electronics", img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", description: "placeholder value"},
	{fc: "contraption", img: "https://images.unsplash.com/photo-1565246144709-9f3a5369c316?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80", description: "placeholder value"},
	{fc: "contrivance", img: "https://images.unsplash.com/photo-1544474650-6cf5bc3f9c0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1322&q=80", description: "placeholder value"},
	{fc: "instrument", img: "https://images.unsplash.com/photo-1563770660834-82b48f27ec9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", description: "placeholder value"},
	{fc: "utensil", img: "https://images.unsplash.com/photo-1549105680-34522ef8b050?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80", description: "placeholder value"},
	{fc: "gadget", img: "https://images.unsplash.com/photo-1587320122541-ce3e46f6fe60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80", description: "placeholder value"},
	{fc: "item", img: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", description: "placeholder value"},
	{fc: "device", img: "https://images.unsplash.com/photo-1504890001746-a9a68eda46e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1279&q=80", description: "placeholder value"},
	{fc: "tool", img: "https://images.unsplash.com/photo-1525972231415-e52a7a56c905?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", description: "placeholder value"},
	{fc: "gizmo", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", description: "placeholder value"},
	{fc: "doodad", img: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80", description: "placeholder value"},
	{fc: "doohickey", img: "https://images.unsplash.com/photo-1452875015199-95154554d9ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80", description: "placeholder value"}
];

function seedDB () {
	//Remove all assets
	Asset.remove({}, function (err) {
		// if (err) {
		// 	console.log(err)
		// }
		// console.log("Removed all assets")
		// //add a few assets
		// data.forEach((seed) => {
		// 	Asset.create(seed, (err, asset) => {
		// 		if (err) console.log(err);
		// 		else {
		// 			console.log("Asset added");
		// 			//create comment
		// 			Comment.create(
		// 				{
		// 					text: "Dead on arrival",
		// 					user: "Tom"
		// 				}, (err, comment) => {
		// 					if (err) console.log(err);
		// 					else {
		// 						asset.comments.push(comment);
		// 						asset.save();
		// 						console.log("Created a new comment");
		// 					}
		// 				}
		// 			);
		// 		}
		// 	});
		// });
	});

}

module.exports = seedDB;

