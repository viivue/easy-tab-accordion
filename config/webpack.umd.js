const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: false,
    entry: "./src/js/easy-tab-accordion.js",
    output: {
        filename: 'easy-tab-accordion.min.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        // prevent error: `Uncaught ReferenceError: self is not define`
        globalObject: 'this',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/js/easy-tab-accordion.js",
                    to: "./easy-tab-accordion.module.js"
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin({extractComments: false})],
    },
};