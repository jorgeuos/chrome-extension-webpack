# How to use Tailwind CSS with Webpack

Useful links:
* [Setup Tailwind CSS with Webpack](https://levelup.gitconnected.com/setup-tailwind-css-with-webpack-3458be3eb547)
* [Setup Tailwind CSS with PostCSS](https://tailwindcss.com/docs/installation/using-postcss)
* [Using Multiple CSS Files](https://tailwindcss.com/docs/adding-custom-styles#using-multiple-css-files)
* [Tailwind CSS with Webpack](https://www.youtube.com/watch?v=bxmDnn7lrnk)
* [Using with Preprocessors - Build-Time Imports](https://tailwindcss.com/docs/using-with-preprocessors#build-time-imports)
* [Webpack Postcss-loader - Official Docs](https://webpack.js.org/loaders/postcss-loader/)
* [PostCSS - Official Docs](https://postcss.org/)

This is my current setup:
Directories:
```bash
tree -L 2 -I node_modules
.
├── LICENSE
├── README.md
├── babel.config.json
├── dist
│   ├── contentScript.js
│   ├── icons
│   ├── manifest.json
│   ├── options.html
│   ├── options.js
│   ├── popup.html
│   ├── popup.js
│   ├── popup.js.map
│   ├── serviceWorker.js
│   ├── serviceWorker.js.LICENSE.txt
│   ├── serviceWorker.js.map
│   └── styles
├── docs
│   └── tailwind.md
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── contentScript.ts
│   ├── options.ts
│   ├── popup.ts
│   ├── serviceWorker.ts
│   └── storage.ts
├── static
│   ├── icons
│   ├── manifest.json
│   ├── options.html
│   └── popup.html
├── styles
│   ├── common.scss
│   ├── options.scss
│   └── popup.scss
├── tailwind.config.js
├── test
│   ├── setup.js
│   └── storage.test.js
├── tsconfig.json
├── webpack.common.cjs
├── webpack.dev.cjs
└── webpack.prod.cjs

10 directories, 35 files
```

## Configuration

Make sure your config files uses the `.cjs` extension.

`tailwind.config.cjs`
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts}',
    './static/**/*.{html,js,ts}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Nunito"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"system-ui"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')( {strategy: 'class'} ),
    require('@tailwindcss/typography'),
  ],
}
```

`postcss.config.cjs`
```js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
```

`webpack.common.cjs`
```js
const path = require('path');

const DotenvPlugin = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    serviceWorker: './src/serviceWorker.ts',
    contentScript: './src/contentScript.ts',
    popup: './src/popup.ts',
    options: './src/options.ts',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        // use: ["style-loader", "css-loader", "postcss-loader", MiniCssExtractPlugin],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new DotenvPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],
};
```


