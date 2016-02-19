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
    }
})

module.exports = mongoose.model('Film', FilmSchema);