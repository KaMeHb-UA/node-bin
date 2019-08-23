var pkgs = require('./pkgs');

function getLatest(obj){
    var versions = Object.getOwnPropertyNames(obj).map(function(v){return +v});
    return Math.max.apply(null, versions)
}

function getTarget(release, major, minor, platform){
    if(!release){
        var latestRelease = getLatest(pkgs);
        for(var i = latestRelease; i > 0; i--){
            try{
                if(pkgs[i])
                    return getTarget(i, major, minor, platform)
            } catch(e){ }
        }
    }
    if(!major){
        var latestMajor = getLatest(pkgs[release]);
        for(var i = latestMajor; i > 0; i--){
            try{
                if(pkgs[release][i])
                    return getTarget(release, i, minor, platform)
            } catch(e){ }
        }
    }
    if(!minor){
        var latestMinor = getLatest(pkgs);
        for(var i = latestMinor; i > 0; i--){
            try{
                if(pkgs[release][major][i])
                    return getTarget(release, major, i, platform)
            } catch(e){ }
        }
    }
    try{
        var res = pkgs[release][major][minor][platform.os];
        if(res && res[platform.arch]) return Object.assign({ release, major, minor }, res[platform.arch]);
    } catch(e){ }
    throw new Error('There is no needed version found')
}

function _(x){
    return (x || 'x') === 'x' ? undefined : +x
}

module.exports = function(targetVersion, targetPlatform){
    if(!targetPlatform) targetPlatform = require('./platform-definition')();
    if(typeof targetPlatform.os !== 'string' || typeof targetPlatform.arch !== 'string') throw new TypeError('targetPlatform is not defined correctly');
    var v = ('' + targetVersion).split('.');
    var found = getTarget(_(v[0]), _(v[1]), _(v[2]), targetPlatform);
    var version = found.release + '.' + found.major + '.' + found.minor;
    return found.repo
        + '/v'
        + version
        + '/node-v'
        + version
        + '-'
        + targetPlatform.os
        + '-'
        + targetPlatform.arch
        + '.'
        + found.format
}
