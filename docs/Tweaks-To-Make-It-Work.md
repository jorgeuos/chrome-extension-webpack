## This is a fork of [sszczep/chrome-extension-webpack](https://github.com/sszczep/chrome-extension-webpack)

Original project:
[sszczep/chrome-extension-webpack](https://github.com/sszczep/chrome-extension-webpack)

# My tweaks to make TailwindCSS work

## Add tailwindcss

I've added more extensive instructions on how to add tailwindcss to this project in [./tailwind.md](./tailwind.md)


```bash
npm install -D style-loader postcss postcss-loader postcss-preset-env tailwindcss@latest autoprefixer@latest
```

Tweak the webpack config:

```diff
------------------------------ webpack.common.cjs ------------------------------
index 468ec1c..213b226 100644
@@ -21,7 +21,13 @@ module.exports = {
       },
       {
         test: /\.(scss|css)$/,
-        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
+        use: [
+          MiniCssExtractPlugin.loader,
+          'css-loader',
+          'postcss-loader',
+          'sass-loader'
+        ],
+        // use: ["style-loader", "css-loader", "postcss-loader", MiniCssExtractPlugin],
       },
     ],
   },
```

Tweak the common.scss file:
```diff
------------------------------ styles/common.scss ------------------------------
index 210aa06..4dbf1ec 100644
@@ -1,9 +1,7 @@
 @import 'normalize.css';
-
-body {
-  background-color: #292d3e;
-  color: #ffffff;
-}
+@import "tailwindcss/base";
+@import "tailwindcss/components";
+@import "tailwindcss/utilities";

 .input-group {
   display: flex;
```


Generate a tailwind.config.cjs(**THIS WAS MY ISSUE, I used `.js` instead of `.cjs`**) file:
```bash
npx tailwindcss init
```
and modify the config:
```diff
----------------------------- tailwind.config.cjs -----------------------------
new file mode 100644
index 0000000..414508c
@@ -0,0 +1,36 @@
+/** @type {import('tailwindcss').Config} */
+module.exports = {
+  content: [
+    './src/**/*.{html,js,ts}',
+    './static/**/*.{html,js,ts}',
+  ],
+  darkMode: ['class', '[data-mode="dark"]'],
+  theme: {
+    extend: {
+      fontFamily: {
+        sans: [
+          '"Nunito"',
+          'ui-sans-serif',
+          'system-ui',
+          '-apple-system',
+          '"system-ui"',
+          '"Segoe UI"',
+          'Roboto',
+          '"Helvetica Neue"',
+          'Arial',
+          '"Noto Sans"',
+          'sans-serif',
+          '"Apple Color Emoji"',
+          '"Segoe UI Emoji"',
+          '"Segoe UI Symbol"',
+          '"Noto Color Emoji"',
+        ],
+      },
+    },
+  },
+  plugins: [
+    require('@tailwindcss/forms')( {strategy: 'class'} ),
+    require('@tailwindcss/typography'),
+  ],
+}
+
```

Add postcss-import to handle multiple css files:
```bash
npm install -D postcss-import
```

Copy the following into `postcss.config.cjs`.
```cjs
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
```

That should be it.

## Now run and build your files

```bash
npm run build
# Or
npm run start
```

## Notes

One way to use tailwindcss is to use the tailwindcss cli to watch the input.css file and output to the output.css file. Then use the output.css file in the html file.

I haven't tried this yet, but it should work.
```bash
npx tailwindcss -i ./src/input.css -o ./dist/style/output.css --watch
```
