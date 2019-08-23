var JSON6 = require('json-6'),
    fs = require('fs'),
    path = require('path'),
    pkgs = fs.readFileSync(path.resolve(__dirname, 'pkgs.json6'), 'utf-8');

module.exports = JSON6.parse(pkgs)
