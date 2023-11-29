// Import the 'express' module
let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req, res, next)=>{
    res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName:'' });
}

module.exports.displayPublicPage = (req, res, next)=>{
    res.render('index', { title: 'Public', displayName: req.user ? req.user.displayName:'' });
}