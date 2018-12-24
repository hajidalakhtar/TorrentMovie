'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Anime = require('./structures/Anime');

var _Anime2 = _interopRequireDefault(_Anime);

var _Movie = require('./structures/Movie');

var _Movie2 = _interopRequireDefault(_Movie);

var _Show = require('./structures/Show');

var _Show2 = _interopRequireDefault(_Show);

var _RouteController = require('./structures/routes/RouteController');

var _RouteController2 = _interopRequireDefault(_RouteController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ShowController = new _RouteController2.default({ dataClass: _Show2.default, tab: 'show' });
const MovieController = new _RouteController2.default({ dataClass: _Movie2.default, tab: 'movie' });
const AnimeController = new _RouteController2.default({ dataClass: _Anime2.default, tab: 'anime' });

/**
 * The PopCorn module
 * @module PopCorn
 */
class PopCorn {

    /**
     * Get the shows route
     * @returns {RouteController<Show>}
     * @memberof PopCorn
     * @readonly
     */
    static get shows() {
        return ShowController;
    }

    /**
     * Get the movies route
     * @returns {RouteController<Movie>}
     * @memberof PopCorn
     * @readonly
     */
    static get movies() {
        return MovieController;
    }

    /**
     * Get the animes route
     * @returns {RouteController<Anime>}
     * @memberof PopCorn
     * @readonly
     */
    static get animes() {
        return AnimeController;
    }
}
exports.default = PopCorn;
module.exports = exports.default;