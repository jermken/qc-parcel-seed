const Parcel = require('parcel-bundler')
const path = require('path')
const open = require('open')
const destConfig = require(path.resolve(process.env.CWD, './config.js'))

module.exports = async function(options) {
    let _default = {
        https: false,
        cache: false,
        hmrHostname: 'localhost',
        watch: options.watch,
        detailedReport: options.silent,
        port: 8080
    }
    let entryFile = path.resolve(process.env.CWD, './src/entry/**/*.html')
    let _options = {..._default, ...(destConfig.dev || {})}
    let openPage = destConfig.openPage || 'index'

    await new Parcel(entryFile, _options).serve(_options.port, _options.https, _options.hmrHostname)
    open(`${_options.https ? 'https':'http'}://${_options.hmrHostname}:${_options.port}/${openPage}/${openPage}.html`)
}