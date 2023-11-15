let mongoose = require('mongoose');
//creating a workout model
let workModel = mongoose.Schema({
    Workout: String,
    Day: String,
    Sets: String,
    Reps: String,
    Muscles: String
    },
    {
        collection: "work"
    }
);
module.exports = mongoose.model('Work', workModel);