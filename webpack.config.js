const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * 原先要設定的 devServer 省略，使用 Webpack4 預設行為。
 * devServer: {
 *   port: 8080,
 *   hot: true,
 * }
 *
 * Webpack4 mode default behavior:
 * - development
 *   - hot module replacement (HMR)
 *   - NamedChunksPlugin
 *   - NamedModulesPlugin
 *
 * - production
 *   - FlagDependencyUsagePlugin
 *   - FlagIncludedChunksPlugin
 *   - ModuleConcatenationPlugin
 *   - NoEmitOnErrorsPlugin
 *   - OccurrenceOrderPlugin
 *   - SideEffectsFlagPlugin
 *   - UglifyJsPlugin
 */
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'scripts/main.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? "assets/styles/main.css" : "assets/styles/main.[hash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
        ]
    },
    devtool: devMode ? "cheap-module-source-map" : "nosources-source-map"
}