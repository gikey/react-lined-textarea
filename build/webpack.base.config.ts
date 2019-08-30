import webpack from "webpack";

const config: webpack.Configuration = {
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "ts-loader",
            },
        }, {
            test: /jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
        }],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    },
};

export default config;
