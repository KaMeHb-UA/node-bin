var arch = process.platform === 'aix' ? 'ppc64' : {
    'ia32': 'x86',
    'x32': 'x86',
    'ppc64': 'ppc64le',
}[process.arch] || process.arch

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

module.exports.arch = arch;
module.exports.os = process.platform === 'win32' || process.platform === 'cygwin' ? 'win' : process.platform
