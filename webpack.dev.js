console.log('-------- webpack.dev.js --------')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
// https://webpack.docschina.org/plugins/mini-css-extract-plugin/
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 使用 cssnano 优化和压缩 CSS。
// https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// 进度条
const WebpackBar = require("webpackbar");

module.exports = {
    // 此选项控制是否生成，以及如何生成 source map。
    // https://webpack.docschina.org/configuration/devtool/
    devtool: "eval-source-map",

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        index: './lib/index.js',
    },

    // https://www.webpackjs.com/configuration/dev-server/#devserver
    devServer: {
        static: {
            directory: path.join(__dirname, ''),
        },
        compress: true,
        port: 9898,
        hot: true,
        open: true,
    },
    
    // https://webpack.js.org/concepts/loaders/
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ]
    },

    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new WebpackBar(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body', // 插入到 body 最底部
            // chunks: ['index'],
        }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                test: /\.css$/i,
            }),
        ],
    },
}
