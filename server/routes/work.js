var express = require('express');
const Work = require('../models/work'); 
var router = express.Router();
let workController = require('../controller/work');
// helper method
let mongoose = require('mongoose');
function requireAuth(req,res,next){
    if(!req.isAuthenticated)
    {
        return res.redirect('/login')
    }
    next();
}

// CRUD --> Create, Read, Update, Delete

// Get router for Read Operation
router.get('/', workController.displayworkList);

// Get router for Create Operation --> display the add workout page
router.get('/add',requireAuth, workController.displayAddPage);

// Post router for Create Operation --> process the add workout page
router.post('/add',requireAuth, workController.processAddPage);

// Get router for Edit/Update Operation --> Display the edit workout page
router.get('/edit/:id',requireAuth, workController.displayEditPage);

// Post router for Edit/Update --> Process the edit workout page
router.post('/edit/:id',requireAuth, workController.processEditPage);

// Get router for Delete Operation
router.get('/delete/:id',requireAuth, workController.performDelete);

module.exports = router;
