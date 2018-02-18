var gulp = require('gulp');
var del = require('del');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('clean', function () {
    return del([
        '../AttService.Service/wwwroot/Veracity',
        '../AttService.Service/bin/wwwroot/Veracity',
    ], {force:true});
});

gulp.task('deploy',
    ['clean'],
    function () {
        gulp.src(['dist/*.html', 'dist/*.js'])
            .pipe(gulp.dest('../AttService.Service/wwwroot/Veracity'))
            .pipe(gulp.dest('../AttService.Service/bin/wwwroot/Veracity'));
        gulp.src(['dist/assets/*.*'])
            .pipe(gulp.dest('../AttService.Service/wwwroot/Veracity/assets'))
            .pipe(gulp.dest('../AttService.Service/bin/wwwroot/Veracity/assets'));
        gulp.src(['dist/assets/svg/*.*'])
            .pipe(gulp.dest('../AttService.Service/wwwroot/Veracity/assets/svg'))
            .pipe(gulp.dest('../AttService.Service/bin/wwwroot/Veracity/assets/svg'));
    });
