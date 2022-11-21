const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    }
                ]
            },
            // Agregamos las reglas para Vue.
            {
                test: /\.vue$/,
                use: 'vue-loader', // Noten que como no necesitamos configurar nada del loader, podemos pasarlo simplemente como un string.
            },
            // Agregamos los loaders para CSS.
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Importante el orden.
            }
        ],
    },
};
