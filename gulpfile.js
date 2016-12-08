var gulp = require('gulp');
var browserSync = require("browser-sync");
var reload      = browserSync.reload;
var less = require("gulp-less");
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var es = require('event-stream');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var print = require('gulp-print');
var angularFilesort = require('gulp-angular-filesort');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var util = require('gulp-util');
var merge = require('merge-stream');
var del = require('del');

/**
 * ************************************ *
 * Gulp Tasks for Development Version   *
 * ************************************ *
 */

/**
 * Copy libs sources to Dev dir
 */
gulp.task('add-libs-to-project', function () {
    /**
     * Css
     * Copy all 3rd-party css source to Dev dir
     */
    gulp.src('./bower_components/bootstrap/less/mixins/*.*')
        .pipe(gulp.dest('./dev_root/css/libs/bootstrap/mixins'));

    gulp.src('./bower_components/bootstrap/less/*.*')
        .pipe(gulp.dest('./dev_root/css/libs/bootstrap/'));

    gulp.src('./bower_components/bootstrap/fonts/*.*')
        .pipe(gulp.dest('./dev_root/fonts/'));

    gulp.src('./bower_components/font-awesome/less/*.*')
        .pipe(gulp.dest('./dev_root/css/libs/font-awesome/'));

    gulp.src('./bower_components/font-awesome/fonts/*.*')
        .pipe(gulp.dest('./dev_root/fonts/'));

    gulp.src('./bower_components/angular-loading-bar/src/loading-bar.css')
        .pipe(gulp.dest('./dev_root/css/libs/'));

    /**
     * Js
     * Copy all 3rd-party js source to Dev dir
     */
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-animate/angular-animate.min.js',
        './bower_components/angular-touch/angular-touch.min.js',
        './bower_components/angular-loading-bar/build/loading-bar.min.js',
        './bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './bower_components/angular-bootstrap/ui-bootstrap.min.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
    ])
        .pipe(gulp.dest('./dev_root/js/libs/'));
});

/**
 * Gulp Create Environment Task for Dev version
 */
gulp.task('setup-dev', [
    'add-libs-to-project',
    'lib-less-dev',
    'project-less-dev',
    'css-inject-dev',
    'js-vendor-inject-dev',
    'js-inject-dev'], function() {
    console.log('Setup of Development Environment starts!')
});

/**
 * Set Up Starter Task to create all environment in Dev
 */
gulp.task( 'start-setup-dev', ['add-libs-to-project', 'setup-dev'], function () {
    console.log('Development Environment created!')
});

/**
 * Styles tasks
 * Compile libs *.less-files to css
 * Concat files
 *
 */
gulp.task('lib-less-dev', ['add-libs-to-project'], function () {
    return gulp.src([
        './dev_root/css/libs/bootstrap/bootstrap.less',
        './dev_root/css/libs/font-awesome/font-awesome.less',
        './dev_root/css/libs/loading-bar.css'
    ])
        .pipe(less())
        .pipe(concat('lib-styles.css'))
        .pipe(gulp.dest('./dev_root/css'));
});

/**
 * Compile dev *.less-files to css
 * Concat files
 */
gulp.task('project-less-dev', function () {
    return gulp.src('./dev_root/css/less/*.less')
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dev_root/css'));
});

/**
 * Injecting dev-css-files in Dev dir
 */
gulp.task('css-inject-dev', [
    'lib-less-dev',
    'project-less-dev'], function () {
    var targetForCustomCss = gulp.src('./dev_root/views/index.html');
    var customCssStream = gulp.src([
        './dev_root/css/lib-styles.css',
        './dev_root/css/main.css'
    ]);

    return targetForCustomCss
        .pipe(inject(customCssStream, { read: false, addRootSlash: false, relative: true })
                //.pipe(print())
                //.pipe(concat('common.min.css'))
                //.pipe(cleanCSS())
                //.pipe(gulp.dest('build/css')), { read: false, addRootSlash: false, relative: true })
                //.pipe(gulp.dest('./dev_root/css')), { read: false, addRootSlash: false, relative: true })
        )
        .pipe(gulp.dest('./dev_root/views/'));
        //.pipe(reload({stream:true}));
});

/**
 * Injecting js-vendor-libs in Dev dir
 */
gulp.task('js-vendor-inject-dev', ['css-inject-dev'], function () {
    var targetForVendorJs = gulp.src('./dev_root/views/index.html');
    var vendorJsStream = gulp.src([
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/bootstrap/dist/js/bootstrap.min.js',
            './bower_components/angular/angular.min.js',
            './bower_components/angular-animate/angular-animate.min.js',
            './bower_components/angular-touch/angular-touch.min.js',
            './bower_components/angular-loading-bar/build/loading-bar.min.js',
            './bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './bower_components/angular-bootstrap/ui-bootstrap.min.js',
            './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'])
        .pipe(print())
        .pipe(gulp.dest('dev_root/js/libs'));

    return targetForVendorJs
        .pipe(inject(vendorJsStream, {name: 'vendor', read: false, addRootSlash: false, relative: true}))
        .pipe(gulp.dest('./dev_root/views/'));
});

/**
 * Injecting Dev js files to Dev dir
 */
gulp.task('js-inject-dev', ['js-vendor-inject-dev'], function () {
    var targetForDevJs = gulp.src('./dev_root/views/index.html');

    var devJsStream = gulp.src([
        './dev_root/js/api-url-config.js',
        './dev_root/js/app.js',
        './dev_root/js/*.js',
        './dev_root/js/**/*.js',
        '!./dev_root/js/libs/*.js'])
        .pipe(print())
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./dev_root/js/'));

    return targetForDevJs
        .pipe(inject(devJsStream,{name: 'devjs', read: false, addRootSlash: false, relative: true}))
        .pipe(gulp.dest('./dev_root/views/'));
});

/**
 * Refresh View tasks for Dev dir
 */
gulp.task('updateViewDev', function() {
    gulp.src(['./dev_root/views/*.*', './dev_root/css/*.css'])
        .pipe(reload({stream:true}));
});
gulp.task('updateScriptDev', ['updateViewDev', 'js-inject-dev'], function() {
    gulp.src('./dev_root/js/**/*.*')
        .pipe(reload({stream:true}));
});

/**
 * Static Dev Server
 */
gulp.task('dev-server', function() {
    browserSync({
        server: {
            baseDir: "./dev_root/"
        },
        startPath: "/views/"
    });
});

/**
 * Gulp Start Task for Dev version
 */
gulp.task('dev-start', [
    'dev-server',
    'lib-less-dev',
    'project-less-dev',
    'css-inject-dev',
    'js-vendor-inject-dev',
    'js-inject-dev'], function() {
    console.log('Gulp started!');

    var devUpdate = ['lib-less-dev', 'project-less-dev', 'css-inject-dev', 'updateViewDev'];

    gulp.watch('./dev_root/css/*.less',devUpdate);
    gulp.watch('./dev_root/css/less/*.less',devUpdate);
    gulp.watch('./build/views/*.*',['updateViewDev']);
    gulp.watch('./dev_root/js/**/*.js',['updateViewDev']);

});


/**
 * **************************** *
 * Gulp Task for Build Version  *
 * **************************** *
 */

/**
 * Clean Up Build dir
 */
gulp.task('clean:build', function () {
    return del([
        // Here we use a globbing pattern to match (delete in this case) everything inside the `build` folder
        './build/*'
        // If you want to exclude some files/folders— negate the pattern
        //'!./build/some.file'
    ]);
});

/**
 * Copy templates from Dev to Build dir
 */
gulp.task('copy-to-build', ['clean:build'], function () {
    gulp.src('./dev_root/views/partials/*.html')
        .pipe(gulp.dest('./build/views/partials'));

    gulp.src('./dev_root/views/*.html')
        .pipe(gulp.dest('./build/views/'));

    return gulp.src('./dev_root/js/libs/*')
        .pipe(gulp.dest('./build/js/libs/'));

});

/**
 * Compiling js-dev js and injecting in Build dir
 */
gulp.task('js-inject-build', ['copy-to-build'], function () {
    var target = gulp.src('./build/views/index.html');

    var devJsStream = gulp.src([
        './dev_root/js/api-url-config.js',
        './dev_root/js/app.js',
        './dev_root/js/*.js',
        './dev_root/js/**/*.js',
        '!./dev_root/js/libs/*.js'])
        .pipe(print())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/js/'));

    return target
        .pipe(
            inject(
                devJsStream,
                {name: 'devjs', read: false, addRootSlash: false, relative: true}))
        .pipe(gulp.dest('./build/views/'));
});

gulp.task('css-inject-build', ['js-inject-build'], function () {
    var targetForCustomCss = gulp.src('./build/views/index.html');
    var customCssStream = gulp.src([
        './dev_root/css/lib-styles.css',
        './dev_root/css/main.css'])
        .pipe(print())
        .pipe(concat('common.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css/'));

    return targetForCustomCss
        .pipe(inject(
            customCssStream,
            { read: false, addRootSlash: false, relative: true }))
        .pipe(gulp.dest('./build/views/'))
        .pipe(reload({stream:true}));
});

/**
 * Static Build Server
 */
gulp.task('build-server', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        },
        startPath: "/views/"
    });
});

/**
 * Default Gulp Task (for build version)
 * Included libs, dev styles compile&inject and reload browsers on changes
 */
gulp.task('create-build', [
    'js-inject-build',
    'css-inject-build'], function() {
    console.log('New Build created!');
});
