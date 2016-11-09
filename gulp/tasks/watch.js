var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', 
    ['copy:watch',
    
    'nunjucks:watch',
    'iconfont:watch',
    'js:watch',
    'sass:watch'
]);
