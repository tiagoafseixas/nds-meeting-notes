var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry : './index.js',
    
    output : {
        path: path.resolve(__dirname, 'public'),
        filename : 'bundle.js',
        publicPath: '/'
    },

    module: {
      loaders: [
        // JAVASCRIPT
        { 
          test: /\.js$/, 
          // excluir os modulos node e a API de backend
          exclude: /(node_modules|models|server.js)/, 
          loader: 'babel-loader?presets[]=es2015&presets[]=react'
        },
        // CSS
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules',
          include: /flexboxgrid/,
        }
      ]
    }
};