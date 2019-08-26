var lzmajs = require('lzma-purejs'),
    Tar = require('./tar'),
    stream = require('stream'),
    Fiber = require('fibers');

var LzmaStream = function(){
    var trans = this;
    stream.Transform.call(trans); // initialize superclass.
    this._fiber = new Fiber(function(){
        var buffer = [], pos = 0;
        var inputStream = new lzmajs.Stream();
        inputStream.readByte = function(){
            if (pos >= buffer.length){
                buffer = Fiber.yield(); pos = 0
            }
            return buffer[pos++]
        };
        var outputStream = new lzmajs.Stream();
        outputStream.writeByte = function(_byte){
            this.write(new Buffer([_byte]), 0, 1)
        };
        outputStream.write = function(buffer, bufOffset, length){
            if (bufOffset !== 0 || length !== buffer.length){
                buffer = buffer.slice(bufOffset, bufOffset + length)
            }
            trans.push(buffer)
        };
        lzmajs.decompressFile(inputStream, outputStream)
    });
    this._fiber.run()
};
LzmaStream.prototype = Object.create(stream.Transform.prototype);
LzmaStream.prototype._transform = function(chunk, encoding, callback){
    this._fiber.run(chunk);
    callback()
};

module.exports = class extends stream.Writable{
    constructor(dir){
        var tarPipe = new Tar(dir);
        var xzPipe = new LzmaStream();
        xzPipe.pipe(tarPipe);
        this.pipe(xzPipe)
    }
}
