var config              = require('./gulp.config')();
var gulp                = require('gulp'),
	gulpIf              = require('gulp-if'),
	args                = require('yargs').argv,
	autoprefixer        = require('gulp-autoprefixer'),
	composer 		    = require('gulp-uglify/composer'),
	eslint				= require('gulp-eslint'),
	babel 				= require('gulp-babel'),
	minifycss           = require('gulp-clean-css'),
	notify			    = require('gulp-notify'),
	plumber			    = require('gulp-plumber'),
	pump 			    = require('pump'),
	removeLogging       = require("gulp-remove-logging"),
	rename			    = require('gulp-rename'),
	sass            	= require('gulp-sass'),
    sourcemaps          = require('gulp-sourcemaps'),
    uglify 			    = require('uglify-es');

var minify      = composer(uglify, console);

var plumberErrorHandler = { 
	errorHandler: notify.onError({
		title: 'Gulp',
		message: 'Error: <%= error.message%>'
	})
};

// prefix > minify > rename > distribute
gulp.task('sass', function(done) {
    var isProd = args.prod;

    pump([
        gulp.src(config.sourceFiles.scss),
        sourcemaps.init(),
        sass(),
		autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'),
		gulpIf(isProd, minifycss({compatibility: 'ie8'})),
	    gulpIf(!isProd, sourcemaps.write('/_maps')),
		gulp.dest(config.destination)
    ], done);
});

// es v6 > jshint > minify > rename > distribute
gulp.task('js', function (done) {
    var isProd = args.prod;

    pump([
        gulp.src(config.sourceFiles.js),
        plumber(plumberErrorHandler),
        gulpIf(isProd, removeLogging({ namespace: ['console', 'window.console'] })),
        eslint({
        	"parserOptions": {
		        "ecmaVersion": 6
		    },
		    rules: {
	            'strict': 2
	        },
	        globals: [
	            'jQuery',
	            '$'
	        ],
	        envs: [
	            'browser'
	        ]
	    }),
	    babel({
            presets: ['@babel/env']
        }),
        gulpIf(isProd, minify()),
        rename({ suffix:'.min' }),
        gulp.dest(config.destination)
    ], done);

});