// Import the 'express' module
let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req, res, next)=>{
    res.render('index', { title: 'Home' });
}

module.exports.displayPublicPage = (req, res, next)=>{
    res.render('index', { title: 'Public' });
}