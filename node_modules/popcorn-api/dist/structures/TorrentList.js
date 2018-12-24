'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Torrent = require('./Torrent');

var _Torrent2 = _interopRequireDefault(_Torrent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Holds a list of Torrents
 * @class
 */
class TorrentList {

    /**
     * @param {?Object} data The data to patch into this class
     */
    constructor(data) {
        if (data) this._patch(data);
    }

    /**
     * Patch data into this class
     * @param {Object} data The data to patch
     * @private
     */
    _patch(data) {
        Object.entries(data).forEach(([res, torrent]) => {
            torrent.resolution = res;
            this[res] = new _Torrent2.default(torrent);
        });
    }

    /**
     * Gets the highest resolution in this TorrentList
     * @type {Torrent}
     */
    get maxRes() {
        return this['1080p'] || this['720p'] || this['480p'] || this['0'];
    }
}
exports.default = TorrentList;
module.exports = exports.default;