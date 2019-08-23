module.exports = function(platform){
    if(typeof process === 'undefined'){
        // is your env a browser? hmm... looks like we may try to find suitable precompiled package for you too
        var process = {
            arch: 'wasm',
            platform: 'js'
        }
    }
    if(!platform) platform = {};
    if(!platform.arch) platform.arch = process.arch;
    if(!platform.os) platform.os = process.platform;

    var arch = platform.os === 'aix' ? 'ppc64' : {
        'ia32': 'x86',
        'x32': 'x86',
        'ppc64': 'ppc64le',
    }[platform.arch] || platform.arch

    if(arch === 'arm'){
        // arm ? assume this is linux
        var r = /architecture\s*:\s*(\S+)/;
        function _(arr){
            var res;
            for(var i = 0; i < arr.length; i++) if(res = r.exec(arr[i])[0]) return res
        }
        try{
            arch = 'armv' + _(require('fs').readFileSync('/proc/cpuinfo', 'utf-8').split('\n')) + 'l'
        } catch(e){
            arch = undefined
        }
        if(!arch) arch = 'armv6l' // defaulted to lower arch
    }

    return {
        arch,
        os: platform.os === 'win32' || platform.os === 'cygwin' ? 'win' : platform.os
    }
}
