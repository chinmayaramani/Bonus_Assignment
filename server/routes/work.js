var express = require('express');
const Work = require('../models/work'); 
var router = express.Router();
let workController = require('../controller/work')

// CRUD --> Create, Read, Update, Delete

// Get router for Read Operation
router.get('/', workController.displayworkList);

// Get router for Create Operation --> display the add workout page
router.get('/add', workController.displayAddPage);

// Post router for Create Operation --> process the add workout page
router.post('/add', workController.processAddPage);

// Get router for Edit/Update Operation --> Display the edit workout page
router.get('/edit/:id', workController.displayEditPage);

// Post router for Edit/Update --> Process the edit workout page
router.post('/edit/:id', workController.processEditPage);

// Get router for Delete Operation
router.get('/delete/:id', workController.performDelete);

module.exports = router;
