const	Asset	= require("../models/asset"),
	  	Comment = require("../models/comment");

//=======================================
// MIDDLEWARE
//=======================================

const middlewareObj = {};

//Authentication middleware
middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please login first.");
	res.redirect("/login");
}

//Authorization middleware for assets
middlewareObj.isAuthorized = function (req, res, next) {
	//is user logged in?
	if (req.isAuthenticated()) {
		Asset.findById(req.params.id, (err, foundAsset) => {
			if (err || !foundAsset) {
				req.flash("error", "Asset not found.");
				res.redirect("back")
			} else {
				//does user own the asset?
				if (foundAsset.user.id.equals(req.user._id)) {
					next();
				} else {
				//if not redirect
					req.flash("error", "User does not have required permission.");
					res.redirect("back");
				}
			}
		});		
	} else {
		//otherwise redirect
		req.flash("error", "Please login first.");
		res.redirect("back");
	}
}

//Authorization middleware for comments
middlewareObj.isAuthorizedComment = function (req, res, next) {
	//is user logged in?
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err || !foundComment) {
				res.redirect("back")
			} else {
				//does user own the comment?
				if (foundComment.user.id.equals(req.user._id)) {
					next();
				} else {
				//if not redirect
					req.flash("error", "User does not have required permission.");
					res.redirect("back");
				}
			}
		});		
	} else {
		//otherwise redirect
		req.flash("error", "Please login first.");
		res.redirect("back");
	}
}

module.exports = middlewareObj