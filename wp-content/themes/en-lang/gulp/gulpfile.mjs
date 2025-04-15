import gulp from 'gulp';
import sassModule from 'gulp-sass';
import sassCompiler from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import concatCSS from 'gulp-concat-css';
import cleanCSS from 'gulp-clean-css';
import browserSyncModule from 'browser-sync';

const {src, dest, watch, parallel} = gulp;
const scss = sassModule(sassCompiler);
const browserSync = browserSyncModule.create();

function compileStyles() {
    return src('../assets/scss/main.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions', 'ie >= 10'],
            cascade: false
        }))
        .pipe(concatCSS('style.css'))
        //.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('../'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['../**/*.php']).on('change', browserSync.reload);
    watch(['../assets/scss/**/*.scss'], compileStyles);
    watch(['../js/**/*.js']).on('change', browserSync.reload);
}

function sync() {
    browserSync.init({
        proxy: 'http://localhost:4294/',
        port: 4300,
        open: true
    });
}

export default parallel(compileStyles, watching, sync);
