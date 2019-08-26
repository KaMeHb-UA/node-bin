var version = require('./package.json').version,
    platform = require('./platform-definition')(),
    linkGenerator = require('./compileLink'),
    https = require('https'),
    link = linkGenerator(version, platform),
    format = link.split('.').pop(),
    Extractor = require(format === 'xz' ? format = 'tar.xz' : format === 'gz' ? format = 'tar.gz' : format);

module.exports = function(dir){
    https.request(link, res => {
        const extractor = new Extractor(dir);
        res.pipe(extractor);
        res.on('end', () => { extractor.finish() });
    })
}
