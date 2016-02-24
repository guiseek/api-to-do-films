'use strict';

var mongoose = require('mongoose'),
    Film = require('../models/film.model');

exports.findAll = function(req, res) {
    Film.find({}).sort({created: 'desc'}).exec(function(err, films) {
        if (err) {
            console.error(err);
            res.status(400).json(err);
        } else {
            res.json(films);
        }
    });
};
exports.create = function(req, res) {
    var film = new Film(req.body);
    film.user = req.auth;
    film.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Filme criado com sucesso',
                film: film
            });
        }
    });
};
exports.remove = function (req, res) {
    var film = req.film;

    film.remove(function (err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Filme removido com sucesso',
                film: film
            });
        }
    });
};
exports.like = function(req, res) {
    var film = req.film;
    var who_liked = req.params.who + '_liked';
    film[who_liked] = !film[who_liked];
    film.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Filme marcado com sucesso',
                film: film
            });
        }
    });
};
exports.update = function(req, res) {
    var film = req.film;
    film.name = req.body.name;
    film.description = req.body.description;
    film.done = req.body.done;
    film.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Filme alterado com sucesso',
                film: film
            });
        }
    });
};
exports.archive = function(req, res) {
    Film.find({done: true}).exec(function(err, films) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            films.forEach(function(film) {
                film.remove();
            });
            res.json({
                message: 'Filmes assistidos removidos com sucesso'
            });
        }
    });
};
exports.filmById = function(req, res, next, filmId) {
    if (!mongoose.Types.ObjectId.isValid(filmId)) {
        res.status(400).json({
            message: 'Filme inválido'
        })
    }
    Film.findById(filmId).exec(function(err, film) {
        if (err) {
            res.status(404).json(err);
        }
        req.film = film;
        next();
    });
}