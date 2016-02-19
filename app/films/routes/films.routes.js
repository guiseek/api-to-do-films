'use strict';

module.exports = function(api) {
    var films = require('../controllers/films.controller');
    
    api.route('/films')
        .get(films.findAll)
        .post(films.create)
        .delete(films.archive);
        
    api.route('/films/:filmId')
        .put(films.update)
        .post(films.heart);
        
    api.param('filmId', films.filmById);
}