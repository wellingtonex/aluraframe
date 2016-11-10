npm init

npm install babel-cli@6.10.1 --save-dev
npm install babel-preset-es2015@6.9.0 --save-dev

.babelrc
{
  "presets": ["es2015"],
  "plugins": ["transform-es2015-modules-systemjs"]
}

package.json
{
  "name": "client",
  "version": "1.0.0",
  "description": "",
  "main": "gulpfile.js",
  "dependencies": {
    "babel-cli": "^6.10.1",
    "babel-preset-es2015": "^6.9.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
     "build": "babel js/app-es6 -d js/app",
     "watch": "babel js/app-es6 -d js/app --watch"
  },
  "author": "",
  "license": "ISC"
}

npm install systemjs@0.19.31 --save
npm install babel-plugin-transform-es2015-modules-systemjs@6.9.0 --save-dev

npm run build
npm run watch

