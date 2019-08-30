import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import merge from "webpack-merge";
import baseConfig from "./webpack.base.config";

const config: webpackDevServer.Configuration = merge(baseConfig, {
    mode: "development",
    entry: "./example/index.tsx",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[hash].js",
    },
    devtool: "inline-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./example/index.html",
            filename: "index.html",
        }),
    ],
    devServer: {
        hot: true,
        inline: true,
        open: true,
        port: 3003,
    },
});

export default config;
