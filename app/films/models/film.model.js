'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FilmSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    done: {
        type: Boolean
    },
    created: {
        type: Date
    }
});

FilmSchema.pre('save', function(next) {
    var film = this;
    if (this.isNew) {
        film.created = new Date();
    }
    next();
});

module.exports = mongoose.model('Film', FilmSchema);