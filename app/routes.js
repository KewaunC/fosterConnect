const ObjectId = require('mongodb').ObjectId;

module.exports = function (app, passport, db, ObjectId) {
  app.get("/", function (req, res) {
    res.render("login.ejs");
  });

  app.get("/teacherPage", isLoggedIn, function (req, res) {
    db.collection("course")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("teacher.ejs", {
          user: req.user,
          courses: result, // result comes form the database // want the results from the currently logged in user

          isStudent: req.user.userType === "teacher", // req.user is provided by passoport and provides access to the logged in user obj
        });
      });
  });
  app.get("/studentPage", isLoggedIn, function (req, res) {
    db.collection("course")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("student.ejs", {
          user: req.user,
          courses: result, // result comes form the database // want the results from the currently logged in user
          isStudent: req.user.userType === "student", // req.user is provided by passoport and provides access to the logged in user obj
        });
      });
  });

  app.get("/edit", isLoggedIn, function (req, res) {
    console.log(req.query.id)
    db.collection("course")
      .find({ _id: ObjectId(req.query.id)})
      .tryNext((err, result) => {
        if (err) return console.log(err);
        res.render("edit.ejs", {course: result});
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
  app.post("/login", function (req, res, next) {
    passport.authenticate("local-login", function (err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.send(401, {
          success: false,
          message: "authentication failed",
        });
      }
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        const url =
          req.user.local.userType === "teacher"
            ? "/teacherPage"
            : "/studentPage";
        res.redirect(url);
      });
    })(req, res, next);
  });

  // SIGNUP =================================
  // show the signup form
  app.get("/signupTeacher", function (req, res) {
    res.render("signupTeacher.ejs", { message: req.flash("signupMessage") });
  });
  app.get("/signupStudent", function (req, res) {
    res.render("signupStudent.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post("/signup", function (req, res, next) {
    passport.authenticate("local-signup", function (err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.send(401, {
          success: false,
          message: "authentication failed",
        });
      }
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        const url =
          req.user.local.userType === "teacher"
            ? "/teacherPage"
            : "/studentPage";
        res.redirect(url);
      });
    })(req, res, next);
  });

  app.post("/addCourse", (req, res) => {
    //when the user is creating a goal that is when the POST /goals is happening, we are inserting in the db collection
    console.log(req.body);
    db.collection("course").insertOne(
      {
        ...req.body,
        teacherID: ObjectId(req.user.local._id),
      },
      (err, result) => {
        if (err) return console.log(err); // shorthand of an if/else console
        console.log("saved to database"); // this is the else
        res.redirect("/"); // index.ejs (show coffe selection)
      }
    );
  });

  app.post("/roster", (req, res) => {
    //when the user is creating a goal that is when the POST /goals is happening, we are inserting in the db collection
    console.log(req.user._id, "ADD ROSTER");
    db.collection("roster").insertOne(
      {
        // ... means  to add outer obj to curretn obj
        ...req.body,
        studentID: ObjectId(req.user._id),
      },
      (err, result) => {
        if (err) return console.log(err); // shorthand of an if/else console
        console.log("saved to database"); // this is the else
        res.redirect("/"); // index.ejs (show coffe selection)
      }
    );
  });

  // app.put('/goal-finish', (req, res) => { // put = update
  //   console.log("Here's the body",req.body)
  //   db.collection('orders')
  //   .findOneAndUpdate({
  //     _id: ObjectID(req.body._id)
  //   }, {
  //     $set: {
  //       complete: true,
  //       thisUser : req.user.local.firstName
  //     }
  //   }, {
  //     sort: {_id: -1},
  //     upsert: true
  //   }, (err, result) => {
  //     if (err) return res.send(err)
  //     res.send(result)
  //   })
  // })

  app.delete("/roster", (req, res) => {
    console.log("delete from roster");
    db.collection("roster").findOneAndDelete(
      { courseID: req.body.courseID, studentID: ObjectId(req.user._id) },
      (err, result) => {
        if (err) return res.send(500, err);
        res.send("Message deleted!");
      }
    );
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/");
  }
};
