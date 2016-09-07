'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	entry: "./js/home",
    output: {
        path: __dirname + "/dist",
        filename: "build.js",
        library: 'home'
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
    	aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        })
    ],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        modulesTemplates: ['*-loader', '*'],
        extensions: ['', '.js']  
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=es2015'
        }]
    }
}
if (NODE_ENV === 'build') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            drop_console: true,
            unsafe: true
        })
    )
}