import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const defaultConfig = {
  plugins: [new MiniCssExtractPlugin()],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
}

const configs = ['main', 'create', 'books', 'view', 'update', 'common'].map(
  (component) => ({
    entry: {
      index: `./views/${component}/assets/index.js`,
    },
    mode: 'production',
    output: {
      path: path.resolve(__dirname, `./public/${component}`),
      filename: 'index.js',
    },
    ...defaultConfig,
  })
)

export default configs
