const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

/**
 * Webpack configuration for production builds
 * of server bundles
 *
 * @param {ProcessEnv} [env] Node env parameter
 * @param {Process.argv} [argv] Commandline parameter
 * @returns webpack.Configuration
 */
module.exports = (env, argv) => {
    return {
        context: process.cwd(),
        entry: {
            server: "./src/server/entry/prod"
        },
        externals: [
            nodeExternals({
                whitelist: [
                    "@scsa/build",
                    "@scsa/global",
                    "@scsa/styling",
                    "@scsa/styling/src/prod",
                    "@scsa/styling/src/dev",
                    "@scsa/messaging"
                ]
            })
        ],
        mode: "production",
        module: {
            rules: [
                {
                    loader: "ts-loader",
                    options: { allowTsInNodeModules: true },
                    test: /\.ts?$/
                }
            ]
        },
        output: {
            filename: "[name].js",
            path: path.join(process.cwd(), "dist", "server"),
            publicPath: "/"
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                SCSA_ENDPOINT_SETTINGS: "local"
            })
        ],
        resolve: {
            extensions: [".ts", ".js"]
        },
        target: "node"
    };
};
