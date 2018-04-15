const path = require('path')
const webpack = require('webpack')  //引入webpack内部插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    //入口
    entry: {
        app: './src/app.js',
        vendors: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router',
            'es6-promise',
            'history',
            'immutable',
            'js-md5',
            'redux-ignore',
            'redux-immutable'
        ]
    },
 
        // entry: './src/app.js',
        // output: {
        //   filename: './dist/app.bundle.js'
        // },

    //输出
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist/js')
    },

    //加载器
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            { test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { modules: true } }] },
            { test: /\.(png|git|jpg|jpeg|bmp)$/i, use: [{ loader: 'url-loader', options: { limit: 5000, output: 'images/' } }] },
        ]
    },

    //插件
    plugins: [

        //代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        //html模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html'
        }),

        //提供公共代码
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'verdors',
        //     filename: '[name].[hash].js'
        // }),

        //热加载插件 
        new webpack.HotModuleReplacementPlugin(),

    ],

    devServer: {
        proxy: {  

            //凡是 '/dangan'  开头的http请求，都会被代理到 localhost:8080上
            '/dangan': {
                target: 'http://localhost:8080',
                secure: false
            }
        },
        contentBase: './public', //本地服务器所加载的页面所载的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true  //使用热更新插件 HotModuleReplacementPlugin  
    }
}