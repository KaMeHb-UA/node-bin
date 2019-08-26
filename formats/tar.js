var Writable = require('stream').Writable,
    tar = require('tar');

module.exports = class extends Writable{
    constructor(dir){
        super();
        this._tarpipe = tar.x({ C: dir });
        this.pipe(this._tarpipe)
    }
}
