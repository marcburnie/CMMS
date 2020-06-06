const 	express	= require("express"),
		router 	= express.Router(),
		passport = require("passport"),
	  	User	= require("../models/user");

//LANDING PAGE
router.get("/", (req, res)=>{
	res.render("landing");
})

// =======================
//  AUTHENTICATION ROUTES
// =======================

//SHOW REGISTER FORM
router.get("/register", (req, res) => {
	res.render("register")
});
	
//handle sign-up logic
router.post("/register", (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if (err) {
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome " + user.username + "!");
			res.redirect("/assets");
		});
	});
});

//show login form
router.get("/login", (req, res) => {
	res.render("login");
});

// login route
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/assets",
		failureRedirect: "/login"
	}), (req, res) => {
});

// logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged out.");
	res.redirect("/assets");
});

module.exports = router;