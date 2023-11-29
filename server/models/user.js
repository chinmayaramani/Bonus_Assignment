let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,  
        default: '',
        trim: true,
        required: 'Username is required'
    },
    displayName: {
        type: String,  
        default: '',
        trim: true,
        required: 'DisplayName is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "user"
});

// configure the option for users
let options = ({ MissingPasswordError: 'Wrong/Missing Password' })
UserSchema.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', UserSchema);
