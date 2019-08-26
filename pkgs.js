var JSON6 = require('json-6'),
    fs = require('fs'),
    path = require('path'),
    pkgs = JSON6.parse(fs.readFileSync(path.resolve(__dirname, 'pkgs.json6'), 'utf-8')),
    repos = pkgs['@repos'];

delete pkgs['@repos'];

function resolveInheritance(repo){
    if('@inherit' in repo){
        var inherited = repos[repo['@inherit']];
        delete repo['@inherit'];
        for(var i in inherited) if(!(i in repo)) repo[i] = inherited[i];
    } else return repo
}

for(var release in pkgs){
    for(var major in pkgs[release]){
        for(var minor in pkgs[release][major]){
            for(var os in pkgs[release][major][minor]){
                for(var arch in pkgs[release][major][minor][os]){
                    var repo = pkgs[release][major][minor][os][arch];
                    if(typeof repo === 'string'){
                        const [ repoName, format ] = repo.split('@');
                        if(!repos[repo]){
                            repos[repo] = {
                                '@inherit': repoName,
                                format
                            }
                        }
                        repo = repos[repo];
                        pkgs[release][major][minor][os][arch] = repo;
                    }
                    resolveInheritance(repo)
                }
            }
        }
    }
}

module.exports = pkgs
