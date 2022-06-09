module.exports = function (app, passport, db) {
  app.get("/", function (req, res) {
    res.render("login.ejs");
  });

  app.get("/mainPage", isLoggedIn, function (req, res) {
    db.collection("user")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        // line 14 says that if the data fron Mongodb comes back as user type "parent" allow contraols on main.ejs and if it is not then
        // run the userType"kid"
        // check the users userType
        // send them to the parent main page
        res.render("main.ejs", {
          user: req.user,
          goals: result,
          isParent: req.user.userType === "parent",
        });
      });
  });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/mainPage", // redirect to the fprofusecure mainPage section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get("/signupParent", function (req, res) {
    res.render("signupParent.ejs", { message: req.flash("signupMessage") });
  });
  app.get("/signupKid", function (req, res) {
    res.render("signupKid.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/mainPage", // redirect to the secure mainPage section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/");
  }
};
