const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const ROOT = path.resolve(__dirname);
const DST_DIR = path.join(ROOT, "dst");
const SRC_DIR = path.join(ROOT, "src");
const JS_DIR = path.join(SRC_DIR, "js");
const STATIC_DIR = path.join(SRC_DIR, "static");

const config = {
  entry: {
    Backtracker: "./src/js/index.jsx"
  },
  output: {
    path: DST_DIR,
    filename: "[name].js",
    libraryTarget: "umd",
    library: "[name]"
  },
  resolve: {
    alias: {
      "~": JS_DIR
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [new CopyWebpackPlugin([{ from: STATIC_DIR }])],
  devServer: {
    contentBase: STATIC_DIR,
    historyApiFallback: { index: "index.html" },
    disableHostCheck: true,
    overlay: true,
    stats: {
      chunks: false,
      colors: true
    },
    port: process.env.WEB_PORT || 3000
  },
  devtool: "source-map"
};

module.exports = config;
