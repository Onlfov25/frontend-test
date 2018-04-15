const path = require('path')
const webpack = require('webpack')  //引入webpack内部插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin') //css分离插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次打包前，清空打包目录

module.exports = {

    //入口
    // entry: './src/app.js',
    entry: {
        app: './src/app.js'
    },

    //输出 __dirname nodejs 全局变量 当前文件所在目录的完整目录名
    output: {
        filename: '[name].[hash].js',
        // path: __dirname + '/dist',
        path: path.resolve(__dirname, 'dist')
    },

    //默认控制台报错，定位到打包文件  此配置可以定位到报错源文件
    devtool: 'inline-source-map',  //开发环境
    // devtool: 'source-map'          //生产环境

    // webpack-dev-server 配置
    devServer: {
        //凡是 '/dangan'  开头的http请求，都会被代理到 localhost:8080上
        proxy: {
            "/base": {
                target: "http://c.y.qq.com/",
                secure: false,  //表示能否请求 https 的服务器
                changeOrigin: true  //表示是否支持跨域请求，默认 false
            }
        },

        historyApiFallback: true,
        port: 3000,
        contentBase: './dist', //本地服务器所加载的页面所在的目录
        open: true,  //server启动，自动打开浏览器
        hot: true,  //启动热更新插件
        inline: true //实时刷新
    },

    //加载器
    module: {
        rules: [
            //css加载 style-loader css-loader  sass-loader extract-text-webpack-plugin
            // less-loader less
            // css找源文件  使用 devtool: 'source-map' 后 use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'];
            {
                // css 加载  css未分离成文件
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader?sourceMap', 'less-loader?sourceMap']
                // use: [{
                //     loader: "style-loader" // creates style nodes from JS strings
                // }, {
                //     loader: "css-loader" // translates CSS into CommonJS
                // }, {
                //     loader: "less-loader" // compiles Less to CSS
                // }]

                // sass加载 ~ 需要  npm install sass-loader node-sass --save-dev
                // test: /\.scss$/,
                // use: [ 'style-loader', 'css-loader', 'sass-loader' ]

                // css加载   css分离成文件  热更新不能使用
                // test: /\.css$/,
                // use: ExtractTextPlugin.extract({
                // fallback: 'style-loader',
                // use: 'css-loader'

                //scss 加载 scss 分离成文件
                // test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                // fallback: 'style-loader',
                // //resolve-url-loader may be chained before sass-loader if necessary
                // use: ['css-loader', 'sass-loader'] }0
                // })
            },

            // js|jsx 加载器  编译react  babel-core  babel-loader  babel-preset-react babel-preset-env
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            // { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },

            // 图片加载器   file-loader  html src标签引入图片 需要 html-loader
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',  // [name] 代表文件名，[ext] 代表文件扩展名
                            outputPath: 'images/'  //输出的路径
                        }
                    },
                    //压缩图片 生产环境，希望图片小点  image-webpack-loader
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        }
                    }
                ]
            },

            //html-loader 
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }],
            },

            //字体 加载器
            { test: /\.woff2?$/, loader: 'url-loader?limit=10000&name=[name].[ext]&outputPath=fonts/' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader?name=[name].[ext]&outputPath=fonts/' },

        ]
    },

    //插件
    plugins: [

        //html模板插件
        new HtmlWebpackPlugin({
            title: 'React Ant-Design Project',  //title
            template: __dirname + '/public/index.html',  //模板  不能是 ./public 
            filename: 'index.html',  //生成的html文件名
            // minify: {
            //     collapseWhitespace: true     //除去html的空格
            // },
            minify: false,
            hash: true   //更好的cache 文件后加hash  app.bundle.js?d819c5b4ff9ec8d67458
        }),

        // css 分离后的名称   
        // new ExtractTextPlugin('style.css'),   //new ExtractTextPlugin('style.[hash].css')
        new ExtractTextPlugin({   //启动热更新  需要关闭
            filename: 'style.css',
            disable: true
        }),

        //清空打包目录 dist目录
        new CleanWebpackPlugin(['dist']),

        //热更新插件  
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};