module.exports = function(app, passport, db) {
    app.get('/', function(req, res) {
        res.render('login.ejs');
    });


        app.get('/mainPage', isLoggedIn, function(req, res) {
            db.collection('user').find().toArray((err, result) => {
              if (err) return console.log(err)
              if (req.user.userType === "parent") { // check the users userType
                  // send them to the parent main page
                  res.render('mainPageParent.ejs', {
                    user : req.user,
                    goals: result
                  })
              } else {
                  // send them to the kid main page
                  res.render('mainPageKid.ejs', {
                    user : req.user,
                    goals: result
                  })
              }
            })
        });
    

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/mainPage', // redirect to the fprofusecure mainPage section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    app.post('') 

    // SIGNUP =================================
    // show the signup form
    app.get('/signupParent', function(req, res) {
        res.render('signupParent.ejs', { message: req.flash('signupMessage') });
    });
    app.get('/signupKid', function(req, res) {
      res.render('signupKid.ejs', { message: req.flash('signupMessage') });
  });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/mainPage', // redirect to the secure mainPage section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
    
        res.redirect('/');
    }
}