'use strict';

module.exports = function(api) {
    var films = require('../controllers/films.controller');
    
    api.route('/films')
        .get(films.findAll)
        .post(films.create)
        .delete(films.archive);
        
    api.route('/films/:filmId')
        .get(films.find)
        .put(films.update)
        .delete(films.delete);
        
    api.param('filmId', films.filmById);
}