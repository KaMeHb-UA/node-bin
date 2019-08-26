var Tar = require('./tar'),
    Writable = require('stream').Writable
    zlib = require('zlib');

module.exports = class extends Writable{
    constructor(dir){
        var tarPipe = new Tar(dir);
        var gzPipe = zlib.createGunzip();
        gzPipe.pipe(tarPipe);
        this.pipe(gzPipe)
    }
}
