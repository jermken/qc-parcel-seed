const Parcel = require('parcel-bundler')
const path = require('path')
const open = require('open')
const destConfig = require(path.resolve(process.env.CWD, './config.js'))

module.exports = async function() {
    let _default = {
        https: false,
        cache: false,
        hmrHostname: 'localhost',
        port: 8080
    }
    let entryFile = path.resolve(process.env.CWD, './src/entry/**/*.html')
    let options = {..._default, ...(destConfig.dev || {})}
    await new Parcel(entryFile, options).serve(options.port, options.https, options.hmrHostname)
    let openPage = destConfig.openPage || 'index'
    open(`${options.https ? 'https':'http'}://${options.hmrHostname}:${options.port}/${openPage}/${openPage}.html`)
}