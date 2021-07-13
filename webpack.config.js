const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
// ovo eksportuje neki objekat koji ima podate o tome gde se nalaze skripte i gde ce da se uradi output