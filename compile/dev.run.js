const Parcel = require('parcel-bundler')
const path = require('path')
const open = require('open')
const fs = require('fs')
const qcConfig = require(path.resolve(process.cwd(), './qc.config.json'))

module.exports = async function() {
    let _default = {
        https: false,
        cache: false,
        hmrHostname: 'localhost',
        port: 8080
    },
        entryFile = path.resolve(process.cwd(), './src/entry/**/*.html'),
        destConfigPath = path.resolve(process.cwd(), './config.dev.js');

    if(fs.existsSync(destConfigPath)) {
        options = Object.assign({}, _default, require(destConfigPath) || {})
    } else {
        options = Object.assign({}, _default)
    }
    const bundler = new Parcel(entryFile, options)
    bundler.serve(options.port, options.https, options.hmrHostname)
    let bundle = await bundler.bundle()

    let openPage = qcConfig.openPage || 'index'
    open(`${options.https ? 'https':'http'}://${options.hmrHostname}:${options.port}/${openPage}/${openPage}.html`)
}