var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), // Подключаем Sass пакет
    autoprefixer =  require('gulp-autoprefixer' );
 
gulp.task('sass', function() { // Создаем таск "sass"
	return gulp.src(['sass/**/*.sass', 'sass/**/*.scss']) // Берем источник
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade:  false
        }))
		.pipe(gulp.dest('./css')) // Выгружаем результата в папку css
    
	});
 
gulp.task('watch', gulp.series('sass'), function() {
	gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], gulp.series('sass')); // Наблюдение за sass файлами в папке sass
});
 
gulp.task('default', gulp.parallel('watch'));
