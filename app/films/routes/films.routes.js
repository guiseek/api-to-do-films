'use strict';

module.exports = function(api) {
    var films = require('../controllers/films.controller');
    
    api.route('/films')
        .get(films.findAll)
        .post(films.create)
        .delete(films.archive);
        
    api.route('/films/:filmId')
        .put(films.update)
        .delete(films.remove);
        
    api.route('/films/:filmId/like/:who')
        .get(films.like);
        
    api.param('filmId', films.filmById);
}