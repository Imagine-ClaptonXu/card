console.log('-------- webpack.prod.js --------')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 压缩 JavaScript
// https://webpack.docschina.org/plugins/terser-webpack-plugin/
const TerserWebpackPlugin = require('terser-webpack-plugin')

// 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
// https://webpack.docschina.org/plugins/mini-css-extract-plugin/
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 使用 cssnano 优化和压缩 CSS。
// https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// 进度条
const WebpackBarPlugin = require("webpackbar")

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {
    // TODO: 测试用，最终要去掉
    devtool: "eval-source-map",

    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        index: './index.js',
    },

    // how to write the compiled files to disk
    // https://webpack.js.org/concepts/output/
    output: {
        clean: true, // 在生成打包文件之前清空 buildPath
        filename: '[name].[chunkhash:8].js',
        path: buildPath,
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
        new WebpackBarPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].css',
            chunkFilename: '[id].[chunkhash:8].css'
        }),
        // <script type='text/script' src="<%=htmlWebpackPlugin.files.chunks['index'].entry %>"></script>
        // <% for (var chunk in htmlWebpackPlugin.files.chunks) { %>
        //     <script src="<%= htmlWebpackPlugin.files.chunks[chunk].entry %>"></script>
        // <% } %>
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body', // 插入到 body 最底部
            // chunks: ['index'],
            // filename: 'index.html'
        }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                test: /\.css$/i,
            }),
            // TODO: 测试用，最终要放开
            // new TerserWebpackPlugin({
            //     test: /\.js(\?.*)?$/i,
            // }),
        ],
    },
}
