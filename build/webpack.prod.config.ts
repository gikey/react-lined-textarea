import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import baseConfig from "./webpack.base.config";

const config: webpack.Configuration = merge(baseConfig, {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "react-lined-textarea.js",
    },
    externals: [
        "react",
        "react-dom",
    ],
});

export default config;
