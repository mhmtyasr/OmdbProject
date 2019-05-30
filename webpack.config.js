
module.exports = [
  {
    name: "index",
    entry: "./src/js/app.js",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
    devServer: {
      host: "localhost",
      port: 3001,
      historyApiFallback: true,
      hot: true
    },
    module: {
      rules: [
        
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ]
        }
      ]
    }
  },
  {
    name: "details",
    entry: "./src/js/details.js",
    output: {
      filename: "details.js",
      path: __dirname + "/dist"
    },
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
    devServer: {
      host: "localhost",
      port: 3001,
      historyApiFallback: true,
      hot: true
    },

    module: {
      rules: [
        // Whatever other rules you have here...
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ]
        }
      ]
    }
  }
];
