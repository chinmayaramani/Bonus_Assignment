var express = require('express');
const Work = require('../models/work'); 
var router = express.Router();


// CRUD --> Create, Read, Update, Delete

module.exports.displayworkList = async (req, res, next) => {
    try {
        const workList = await Work.find();
        res.render('work/list', {
            title: 'Public',
            workList: workList,
            displayName: req.user ? req.user.displayName:''
        });
    } catch (error) {
        console.error(error);
        res.render('work/list', {
            error: 'Server Error'
        });
    }
}

module.exports.displayAddPage = (req, res, next) => {
    try {
        res.render('work/add', {
            title: 'Add Workout',
            displayName: req.user ? req.user.displayName:''
        });
    } catch (error) {
        console.error(error);
        res.render('work/list', {
            error: 'Server Error'
        });
    }
}

module.exports.processAddPage = async (req, res, next) => {
    try {
        let newWork = new Work({
            "Workout": req.body.Workout,
            "Day": req.body.Day,
            "Sets": req.body.Sets,
            "Reps": req.body.Reps,
            "Muscles": req.body.Muscles,
        });

        await newWork.save();

        res.redirect('/worklist'); // Redirect to the worklist page after adding a workout
    } catch (error) {
        console.error(error);
        res.render('work/list', {
            error: 'Server Error'
        });
    }
}

module.exports.displayEditPage = async (req, res, next) => {
    try {
        const work = await Work.findById(req.params.id);
        res.render('work/edit', {
            title: 'Edit Workout',
            displayName: req.user ? req.user.displayName:'',
            work: work
        });
    } catch (error) {
        console.error(error);
        res.render('work/list', {
            error: 'Server Error'
        });
    }
}

module.exports.processEditPage = async (req, res, next) => {
    try {
        await Work.findByIdAndUpdate(req.params.id, {
            "Workout": req.body.Workout,
            "Day": req.body.Day,
            "Sets": req.body.Sets,
            "Reps": req.body.Reps,
            "Muscles": req.body.Muscles,
        });

        res.redirect('/worklist');
    } catch (error) {
        console.error(error);
        res.render('work/list', {
            error: 'Server Error'
        });
    }
}

module.exports.performDelete = async (req, res, next) => {
    try {
        await Work.findByIdAndDelete(req.params.id);
        res.redirect('/worklist');
    } catch (error) {
        console.error(error);
        res.render('work/list', {
            error: 'Server Error'
        });
    }
}