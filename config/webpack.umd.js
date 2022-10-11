const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const webpack = require('webpack');
const PACKAGE = require('../package.json');
const banner = `
/**!
 * ${PACKAGE.prettyName} v${PACKAGE.version}
 * @author ${PACKAGE.author.name}
 * @homepage ${PACKAGE.homepage}
 * @license ${PACKAGE.license} ${new Date().getFullYear()}
 */
`;

module.exports = {
    mode: 'production',
    devtool: false,
    entry: "./src/easy-tab-accordion.js",
    output: {
        filename: 'easy-tab-accordion.min.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        // prevent error: `Uncaught ReferenceError: self is not define`
        globalObject: 'this',
    },
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: "./src/easy-tab-accordion.js",
        //             to: "./easy-tab-accordion.module.js"
        //         },
        //     ],
        // }),
        new webpack.BannerPlugin({
            banner: banner,
            raw: true
        })
    ],
    optimization: {
        minimizer: [new TerserPlugin({extractComments: false})],
    },
};