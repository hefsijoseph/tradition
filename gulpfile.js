const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

function buildStyles() {
  return src('sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(purgecss({
      content: ['./**/*.html', './**/*.js'], // Paths to HTML and JS files for PurgeCSS
      defaultExtractor: content => {
        // Extract classes including the formats text-[#hexcode] and bg-[#hexcode]
        return content.match(/[\w-/:]+(?<!:)|text-\[#\w+\]|bg-\[#\w+\]/g) || [];
      }
    }))
    .pipe(dest('dist/css'));
}

function watchTask() {
  watch(['sass/**/*.scss', './**/*.html',  './**/*.js'], buildStyles);
}

exports.default = series(buildStyles, watchTask);