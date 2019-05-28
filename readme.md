
<h1 align="center">
  Image Comparison Slider for WordPress
</h1>

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg) ![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat)


A basic plugin to add an easy shortcode for creating image comparison sliders to your WordPress site.

## Features

**Optimized Style and SASS**
* SASS Style
* CSS minified

**ES6 & Optimization**
* JS minified and uglified
* ES Lint
* Babel Compiler

### Folder structure
```
.
├── image-comparison-slider.php
├── src 
│   ├── img-comparison.js
│   ├── img-comparison.scss
├── gulp.config.js 
├── gulpfile.js 
├── pacakge.json
└── package-lock.json
```
You can see above the basic structure of the basic breakdown of files

## Build
* Both functions clean the `dist` directory removing old files/sourcemaps
* `npm run build:dev` - builds un-minfied js/css with sourcemaps
* `npm run build:prod` - builds minified js/css no sourcemaps

