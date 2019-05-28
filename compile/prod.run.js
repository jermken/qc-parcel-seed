const Parcel = require('parcel-bundler')
const path = require('path')
const logger = require('../lib/util/logger')
const rimraf = require('rimraf')
const fs = require('fs')
module.exports = async function(config = {}) {
    let _default = {
        https: false,
        hmrHostname: 'localhost',
        port: 8080,
        outDir: './dist',
        sourceMaps: false
    },
        options = Object.assign({}, _default, config),
        entryFile = path.resolve(process.cwd(), './src/entry/**/*.html');

    const outDir = path.join(process.cwd(), `/${_default.outDir}`)
    if (fs.existsSync(outDir)) {
        rimraf.sync(outDir)
    }
    const bundler = new Parcel(entryFile, options)
    let bundle = await bundler.bundle()
    logger.success('compiled successfully')
}