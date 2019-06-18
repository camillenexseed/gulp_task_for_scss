const gulp = require('gulp')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const sourcemaps = require('gulp-sourcemaps')

baseDir = 'src/'
paths = {
  'scss': [ baseDir + 'scss/**.scss', baseDir + 'scss/*/**.scss', baseDir + 'scss/*/*/**.scss'],
  'css': baseDir + 'css/'
}

//scss
function scss(done) {
  gulp.src()
    .pipe(sourcemaps.init(paths.scss))
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass(
      {
        outputStyle: 'compressed',
        // expanded
        // indentWidth: 2
      })
    )
    .pipe(autoprefixer({
      // browsers: ['last 2 version']
    })
    )
    .pipe(gulp.dest(paths.css))
  done()
}

//BrowserSyc
function browser(done) {
  browserSync({
    port: 3030,
    browser: ["google chrome"],
    server: {
      baseDir: baseDir,
      index: 'index.html'
    },
    livereload: true,
    open: 'external',
  })
  done()
}

//watch
function watch(done) {
  gulp.watch(paths.scss, scss).on('change', browserSync.reload)
  gulp.watch([baseDir + '**.html']).on('change', browserSync.reload)
  done()
}

//default task
gulp.task('default',
  gulp.series(browser,
    gulp.parallel(scss, watch),
  )
)