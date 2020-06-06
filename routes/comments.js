const 	express	= require("express"),
		router 	= express.Router({mergeParams: true}),
		Asset	= require("../models/asset"),
	  	Comment	= require("../models/comment"),
		middleware = require("../middleware");

//=======================================
// COMMENTS ROUTES
//=======================================

//Comments new
router.get("/new", middleware.isLoggedIn, (req, res) => {
	// find asset by id
	Asset.findById(req.params.id, (err, asset) => {
		if (err || !asset) {
			req.flash("error", "No asset found.");
		} else {
			res.render("comments/new", {asset:asset});
		}
	})
})

//Comments create
router.post("/", middleware.isLoggedIn, (req, res) => {
	//lookup asset using ID
	Asset.findById(req.params.id, (err, asset) => {
		if (err || !asset) {
			req.flash("error", "No asset found.");
			res.redirect("/assets");
		} else {
			//create new comments
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					req.flash("error", "Something went wrong.");
					console.log(err);
				} else {
					//add username and id to comment
					comment.user.id = req.user._id;
					comment.user.username = req.user.username;
					//save comment
					comment.save();
					//connect new comment asset
					asset.comments.push(comment);
					asset.save();
					//redirect to asset show page
					req.flash("success", "Comment successfully created.");
					res.redirect('/assets/' + asset._id)
				}
			});
		}
	});
});

//Comments edit
router.get("/:comment_id/edit", middleware.isAuthorizedComment, (req, res) => {
	Asset.findById(req.params.id, (err, foundAsset) => {
		if (err || !foundAsset) {
			req.flash("error", "No asset found.");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if (err || !foundComment) {
				req.flash("error", "Could not find comment.");
				res.redirect("back");
			} else {
				res.render("comments/edit", {asset_id: req.params.id, comment: foundComment});
			}
		});
	});

});

//Comments update
router.put("/:comment_id", middleware.isAuthorizedComment, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if (err || !updatedComment) {
			req.flash("error", "Something went wrong.");
			res.redirect("back");
		} else {
			req.flash("success", "Comment successfully edited.");
			res.redirect("/assets/" + req.params.id);
		}				  
	});
});

//Comments destroy route
router.delete("/:comment_id", middleware.isAuthorizedComment, (req, res) => {
	//fid by id and remove
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if (err) {
			req.flash("error", "Something went wrong.");
			res.redirect("back");
		} else {
			req.flash("success", "Comment successfully deleted.");
			res.redirect("/assets/" + req.params.id);
		}
	});
});

module.exports = router;