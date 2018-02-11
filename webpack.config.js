const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
//这里我们使用webpack-bundle-analyzer来分析 Webpack 生成的包体组成并且以可视化的方式反馈给开发者
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const otherPlugins = process.argv[1].indexOf('webpack-dev-server') >= 0 ? [] : [
    new Visualizer(), // remove it in production environment.
    new BundleAnalyzerPlugin({
        defaultSizes: 'parsed',
        // generateStatsFile: true,
        statsOptions: {source: false}
    }),
];
const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        pxtorem({rootValue: 100, propWhiteList: []})
    ],
    cssnano
};
/////
/*module.exports = {
  devtool : 'inline-source-map',
  context : path.resolve(__dirname,'../client'),
  entry: entry,
  output:{ 
    path:path.join(__dirname,filePath+'js'),
    publicPath:'js/',
    chunkFilename: "chunks/chunks_[name].js",
    filename : '[name].js'
  },
  module:modules,
  plugins:_plugins
}*/
/////
console.log(process.env.NODE_ENV)
module.exports = {
    //devtool: 'source-map', // or 'inline-source-map
    entry: {"index": path.resolve(__dirname, 'src/index')},
   /* output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: ''
    },*/
    output:{ 
        path:path.join(__dirname,'/dist'),
        publicPath:'',
        chunkFilename: "chunks/chunks_[name].js",
        filename : '[name].js'
      },
    devServer: {
        historyApiFallback: true,
        hot: true,
        disableHostCheck:true,
        inline: true,
        contentBase: "./public",
        host: process.env.HOST,
        progress: true,
        port: 8005,
        stats: {colors: true},
        proxy: {
            '/api/*': {
                target: 'http://testxws.sibumbg.com',
                secure: false,
                changeOrigin: true
            },
            '/hd/*': {
                target: 'http://testxws.sibumbg.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: {'^/hd': '/hd/'}
            }

        }
    },
     
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), path.join(__dirname, 'src')],
        extensions: ['.web.js', '.jsx', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        'external-helpers',
                        ["transform-runtime", {polyfill: true}],
                        ["import", [{"style": true, "libraryName": "antd-mobile"}]] // css  `style: true` 会加载 less 文件
                    ],
                    presets: ['es2015', 'stage-0', 'react', 'stage-3']
                    //presets: [['es2015', { modules: false }], 'stage-0', 'react'] // tree-shaking
                }
            },
            {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: "url-loader?limit=1024"},
            // 注意：如下不使用 ExtractTextPlugin 的写法，不能单独 build 出 css 文件
            // { test: /\.less$/i, loaders: ['style-loader', 'css-loader', 'less-loader'] },
            // { test: /\.css$/i, loaders: ['style-loader', 'css-loader'] },
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: postcssOpts
                        }, {
                            loader: 'less-loader', options: {modifyVars: {"@hd": "2px", "@brand-primary": "#FAC34C"}}
                        }
                    ]
                })
            },
            {
                test: /\.scss$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: postcssOpts
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/i, use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: postcssOpts,
                        
                    }
                ]
            })
            }

        ]
    },
    plugins: [
        //配置NODE_ENV 环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('shared.js'),
        new webpack.optimize.CommonsChunkPlugin({
            // minChunks: 2,
            name: 'shared', //对应于上面的entry的key  将index 打包命名 shared name 可以是个数组 [a,n,]
            filename: 'shared1.js'
        }),
        new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
        new HtmlWebpackPlugin({
            // filename: '../views/dev/index.html',
            //favicon: 'static/favicon.png',
            // chunks: ['index'],
            hash:true,
            template: './views/tpl/index.tpl.html',
            inject: 'body' //单独webpack
        }),
         new CopyWebpackPlugin([
          {
            from : path.join(__dirname,'./views/404.html'),
            to : path.join(__dirname,'./dist/404.html')
          },
          {
            from : path.join(__dirname,'./src/assets/images/404.png'),
            to : path.join(__dirname,'./dist/404.png')
          }
         
        ])
        
        //...otherPlugins
    ]
}
