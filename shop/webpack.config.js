const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
  filename: "bundle.css",
});

module.exports = {
  entry: "./App.js", // main application file
  output: {
    path: __dirname, // path to output files directory
    filename: "bundle.js", // name of the created file
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/, // which files to process
        exclude: /node_modules/, // which files to skip
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          use: ["css-loader"],
        }),
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          use: ["css-loader", "sass-loader"],
        }),
      },
    ],
  },
  plugins: [extractCSS],
};
