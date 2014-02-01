var gulp = require('gulp'),
  connect = require('gulp-connect'),
  compass = require('gulp-compass'),
  prefixer = require('gulp-autoprefixer'),
  refresh = require('gulp-livereload'),
  htmlhint = require("gulp-htmlhint"),
  csslint = require('gulp-csslint'),
  lr = require('tiny-lr'),
  server = lr();

gulp.task('compass', function() {
    gulp.src('source/assets/scss/**/*.scss')
        .pipe(compass({
            css: 'source/assets/css/',
            sass: 'source/assets/scss',
            image: 'source/assets/img'
        }))
        .pipe(prefixer('last 2 version'))
        .pipe(gulp.dest('source/assets/css'))
        .pipe(refresh(server));
});

gulp.task('livereload', function(){  
    server.listen(35729, function(err){
        if(err) return console.log(err);
    });
});

gulp.task('htmlhint', function() {
  gulp.src('source/assets/css/*.css')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('csslint', function() {
  gulp.src('source/assets/css/*.css')
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});

gulp.task('connect', connect({
  root: __dirname + '/source',
  port: 3000,
  open: false
}));

gulp.task('watch', function() {
  gulp.watch('source/assets/scss/**/*.scss', function(event) {
    gulp.run('compass');
  });
  gulp.watch('source/*.html', function(event) {
    gulp.src('source/*.html')
      .pipe(refresh(server));
  });
});

gulp.task('default', function() {
  gulp.run('connect', 'livereload', 'compass', 'htmlhint', 'csslint', 'watch');
});

gulp.task('lint', function() {
  gulp.run('htmlhint', 'csslint');
});
