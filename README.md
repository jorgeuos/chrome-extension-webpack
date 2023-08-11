# This is a fork

Original project:
[sszczep/chrome-extension-webpack](https://github.com/sszczep/chrome-extension-webpack)


## Trying to add tailwindcss

I'm trying to add tailwindcss to this project.

I'm following this guide:
~~[How to use Tailwind CSS with Webpack](https://www.youtube.com/watch?v=bxmDnn7lrnk)~~
[Setup Tailwind CSS with Webpack](https://levelup.gitconnected.com/setup-tailwind-css-with-webpack-3458be3eb547)


```bash
npm install -D style-loader postcss postcss-loader postcss-preset-env tailwindcss@latest autoprefixer@latest
```

Tweak the webpack config:

```diff
diff --git a/webpack.common.cjs b/webpack.common.cjs
index 468ec1c..726fca4 100644
--- a/webpack.common.cjs
+++ b/webpack.common.cjs
@@ -21,7 +21,7 @@ module.exports = {
       },
       {
         test: /\.(scss|css)$/,
-        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
+        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
       },
     ],
   },
```

Tweak the common.scss file:
```diff
diff --git a/styles/common.scss b/styles/common.scss
index 210aa06..ff8c082 100644
--- a/styles/common.scss
+++ b/styles/common.scss
@@ -1,4 +1,7 @@
 @import 'normalize.css';
+@tailwind base;
+@tailwind components;
+@tailwind utilities;

 body {
   background-color: #292d3e;
```

Generate a tailwind.config.js file:
```bash
npx tailwindcss init
```
and add `./dist/*.html` to the purge array.


Copy the following into postcss.config.js.

```js
const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    'postcss-preset-env',
    tailwindcss
  ],
};
```

Add postcss-import to handle multiple css files:
```bash
npm install -D postcss-import
```


```bash
npx tailwindcss -i ./src/input.css -o ./dist/style/output.css --watch
```
