'use strict'

// model dependencies
const
    mongoose = require("mongoose"),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema


// MONGOOSE MODEL CONFIGURATION
const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: [Schema.Types.ObjectId],
        refs: 'Recipe'
    }
});


UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        return next()
    })
})


module.exports = mongoose.model('User', UserSchema);

