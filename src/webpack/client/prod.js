const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

/**
 * Webpack configuration for production builds
 * of client bundles
 *
 * @param env Node env parameter
 * @param argv Commandline parameter
 * @returns webpack.Configuration
 */
module.exports = (env, argv) => {
    return {
        entry: {
            client: "./src/client/index"
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: "ts-loader"
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                }
            ]
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        output: {
            filename: "[name].js",
            path: path.join(process.cwd(), "dist", "client"),
            publicPath: "/"
        },
        plugins: [
            new MiniCssExtractPlugin({
                chunkFilename: "[id].css",
                filename: "[name].css"
            })
        ],
        resolve: {
            extensions: [".ts", ".js"]
        },
        target: "web"
    };
};
