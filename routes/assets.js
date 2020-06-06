const 	express	= require("express"),
		router 	= express.Router(),
		Asset	= require("../models/asset"),
		middleware = require("../middleware");


//=======================================
// ASSET ROUTES
//=======================================

//INDEX ROUTE - show all assets
router.get("/", (req, res)=>{
	//Get all assets from DB
	Asset.find({}, function (err, allAssets){
		if (err) {
			console.log(err);
		} else {
			res.render("assets/index", {assets:allAssets});
		}
	})
})

//NEW - show form to create new asset
router.get("/new", middleware.isLoggedIn, (req, res)=>{
	res.render("assets/newAsset");
})

//CREATE - add new asset to DB
router.post("/", middleware.isLoggedIn, (req, res)=>{
	const user = {
		id: req.user._id,
		username: req.user.username
	};
	//Create a new campground and save to DB
	Asset.create({fc: req.body.fc, img: req.body.img, description: req.body.description, user: user}, function (err, newlyCreated) {
		if (err) {
			req.flash("error", "Something went wrong");
			console.log(err);
		} else {
			req.flash("success", "Asset successfully created.");
			res.redirect("/assets");
		}
	})
})

//SHOW - shows info about one asset
//Must be last GET otherwise:id will not work
router.get("/:id", (req, res) => {
	//find the asset with the provided ID
	Asset.findById(req.params.id).populate("comments").exec((err, foundAsset) => {
		if (err || !foundAsset) {
			req.flash("error", "Asset not found.");
			res.redirect("back");
		} else {
			//render show template with that asset
			res.render("assets/show", {asset: foundAsset});
		}
	});
});

// EDIT ASSET ROUTE
router.get("/:id/edit", middleware.isAuthorized, (req, res) => {
	Asset.findById(req.params.id, (err, foundAsset) => {
		res.render("assets/edit", {asset: foundAsset});
	});		
});

// UPDATE ASSET ROUTE
router.put("/:id", middleware.isAuthorized, (req, res) => {
	//find and update the correct campground
	Asset.findByIdAndUpdate(req.params.id, req.body.asset, (err, updatedAsset) => {
		if (err || !updatedAsset) {
			req.flash("error", "Something went wrong.");
			res.redirect("/assets");
		} else {
			//redirect to show page
			req.flash("success", "Asset successfully edited.");
			res.redirect("/assets/" + req.params.id)
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.isAuthorized, (req, res) => {
	Asset.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			req.flash("error", "Something went wrong.");
			res.redirect("/assets");
		} else {
			req.flash("success", "Asset successfully deleted.");
			res.redirect("/assets");
		}
	});
});

module.exports = router;