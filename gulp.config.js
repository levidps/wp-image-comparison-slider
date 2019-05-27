module.exports = function() {
    var sourcePath = './src/';

    var config = {
            sourcePath: sourcePath,
            sourceFiles   : {
                scss : sourcePath + '/**/*.scss',
                js   : sourcePath + '/**/*.js',
            },
            destination   : './dist/',
        };

    return config;
};
