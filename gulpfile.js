var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass'),
    karma = require('karma').Server,
    plumber = require('gulp-plumber')
    connect = require('gulp-connect');

/**
 * Help
 * This task prints out the available commands
 */
gulp.task('help', function(){
    gutil.log('');
    gutil.log('Usage: ' + gutil.colors.magenta('gulp') + ' [<tasks>] [<options>]');

    gutil.log('');
    gutil.log('Tasks:');
    gutil.log('\t build \t\t Builds the app into the dist directory');
    gutil.log('\t connect \t Serves the production app from the dist directory');
    gutil.log('\t test \t\t Run all tests then exits');
    gutil.log('\t tdd \t\t Watches for file changes and runs all test on each change, useful for TDD');
    gutil.log('\t default \t Run a local dev environment');
    gutil.log('\t help \t\t Prints out this command');
});

/**
 * Build
 * Builds all files for production and moves them into the dist directory
 */
gulp.task('build', ['html', 'images', 'css', 'js', 'vendor', 'vendorcss', 'buildIndex']);

/**
 * Default
 * The default task is a development server which watches all source 
 * files and builds upon each file change.
 */
gulp.task('default', ['build', 'connect', 'watch']);

//--------------------------------------------------------------
// BUILD TASKS
//--------------------------------------------------------------

/**
 * Html
 * Copies all of the partials into the dist directory
 */
gulp.task('html', function () {
    gulp.src('src/partials/**/*.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/partials'));
});

/**
 * Images
 * Copies all of the images into the dist directory
 */
gulp.task('images', function () {
    gulp.src('src/images/**/*')
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/images'));
});

/**
 * Css
 * Builds all sass into a single file and moves it into the dist directory
 */
gulp.task('css', function () {
    gulp.src('src/css/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/css'));
});

/**
 * Vendor
 * Concat and uglify all third party javascript and move to dist
 */
gulp.task('vendorcss', function () {
    gulp.src(['bower_components/material-design-lite/material.css'])
        .pipe(concat('vendor.css'))
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/css'));
});

/**
 * Js
 * Concat and uglify all of our javascript into a single file and move to dist
 */
gulp.task('js', function () {
    // We load our js files in a specific order to make sure our base dependencies 
    // are available before use
    gulp.src(['src/components/base/Class.js',
            'src/components/base/EventDispatcher.js',
            'src/components/base/Events.js',
            'src/components/base/BaseDirective.js',
            'src/components/base/*',
            'src/lang/en/lang.js', //Include our lang strings
            'src/**/*.*js'])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});

/**
 * Vendor
 * Concat and uglify all third party javascript and move to dist
 */
gulp.task('vendor', function () {
    gulp.src(['bower_components/angular/angular.js',
              'bower_components/angular-translate/angular-translate.js',
              'bower_components/angular-ui-router/release/angular-ui-router.js',
              'bower_components/moment/moment.js',
              'bower_components/angular-moment/angular-moment.js',
              'bower_components/material-design-lite/material.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});

/**
 * BuildIndex
 * Simply copies index.html file over to dist
 * Could be used for move advanced replacements eventually
 */
gulp.task('buildIndex', [], function () {
    gulp.src('src/index.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});


//--------------------------------------------------------------
// SERVER TASKS
//--------------------------------------------------------------

/**
 * Connect
 * Makes a server which points to our dist directory
 */
gulp.task('connect', ['build'], function() {
    connect.server({
        root: 'dist',
        port: 1234,
        livereload: true,
        fallback: 'dist/index.html'
    });
});
 
/**
 * Watch
 * Looks for changes in our source files and rebuilds and reloads 
 * whenever a change is detected
 */
gulp.task('watch', ['build'], function () {
    gulp.watch(['src/partials/**/*.html'], ['html']);
    gulp.watch(['src/css/**/*.scss'], ['css']);
    gulp.watch(['src/images/**/*'], ['images']);
    gulp.watch(['src/**/*.js'], ['js']);
    gulp.watch(['bower_components/**/*.js'], ['vendor']);
    gulp.watch(['bower_components/**/*.css'], ['vendorcss']);
    gulp.watch(['src/index.html'], ['buildIndex']);
});

//--------------------------------------------------------------
// TESTING TASKS
//--------------------------------------------------------------

/**
 * Test
 * Runs the karma tests once and exists upon completion
 */
gulp.task('test', ['build'], function (cb) {
    runKarma(cb, true);
});

/**
 * TDD
 * Runs the karma tests and sets up a watcher to rerun the 
 * tests each time a source file is updated
 */
gulp.task('tdd', ['build'], function (cb) {
    runKarma(cb, false);
});

/**
 * RunKarma
 * The actual task which runs the karma tests
 * @param  {Function} cb     callback to signal to gulp when the task is complete
 * @param  {bool}     single whether to run tests once or setup a watcher
 */
function runKarma(cb, single) {
    new karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: single
    }, function(status) {
        // Hack to make sure karma exits immediately with its error code
        process.exit(status);

        // cb(status ? "Karma tests did not pass" : undefined);
    }).start();  
}