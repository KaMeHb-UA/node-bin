var pkgs = require('./pkgs');

function getLatest(obj){
    var versions = Object.getOwnPropertyNames(obj).map(function(v){return +v});
    return Math.max.apply(null, versions)
}

function getTarget(release, major, minor, platform){
    if(!release){
        var latestRelease = getLatest(pkgs);
    }
    pkgs
}

function _(x){
    return (x || 'x') === 'x' ? undefined : +x
}

module.exports = function(targetVersion, targetPlatform){
    if(!targetPlatform) targetPlatform = require('./platform-definition');
    if(typeof targetPlatform.os !== 'string' || typeof targetPlatform.arch !== 'string') throw new TypeError('targetPlatform is not defined correctly');
    var v = ('' + targetVersion).split('.');
    return getTarget(_(v[0]), _(v[1]), _(v[2]), targetPlatform)
}
