let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');
let passport = require('passport');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User;

//Login Setup
router.get('/login', function(req, res, next) {
    if (!req.user) {
        res.render('auth/login', {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ""
        });
    } else {
        return res.redirect('/');
    }
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, User, info) {
        // server error
        if (err) {
            return next(err);
        }
        // login error
        else if (!User) {
            req.flash('loginMessage', 'AuthenticationError');
            return res.redirect('/login')
        }
        req.login(User, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/worklist');
        });
    })(req, res, next);
});

router.get('/register', function(req, res, next) {
    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            message: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ""
        });
    } else {
        return res.redirect('/');
    }
});

router.post('/register', function(req, res, next) {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error in inserting new user");
            if (err.name === "UserExistError") {
                req.flash('registerMessage', 'Registration Error: User already exists');
            }
            return res.render('auth/register', {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/worklist');
            });
        }
    });
});

// logout
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
    });
    res.redirect('/home');
});

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET public page. */
router.get('/public', indexController.displayPublicPage);

module.exports = router;
