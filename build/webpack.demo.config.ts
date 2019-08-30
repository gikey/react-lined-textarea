import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpackDevServer from "webpack-dev-server";
import merge from "webpack-merge";
import baseConfig from "./webpack.base.config";

const config: webpackDevServer.Configuration = merge(baseConfig, {
    mode: "development",
    entry: "./example/index.tsx",
    output: {
        path: path.resolve(__dirname, "../gh-pages"),
        filename: "[name].[hash].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./example/index.html",
            filename: "index.html",
        }),
    ],
});

export default config;
