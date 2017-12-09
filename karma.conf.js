module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'web/bower_components/angular/angular.min.js',
      'web/bower_components/angular-mocks/angular-mocks.js',
      'web/bower_components/angular-route/angular-route.min.js',
      'web/bower_components/firebase/firebase.js',
      'web/bower_components/angularfire/dist/angularfire.min.js',
      'web/app/app.js',
      //'web/app/**/**.js', alkuperäinen
      //'test/*.js' alkuperäinen
      'web/app/controllers/*.js', // lisätty
      'test/add_movie_test.js', // lisätty
      'test/movie_list_test.js', // lisätty
      'test/show_movie_test.js', // lisätty (tehtävä 44)
      'test/edit_movie_test.js' // lisätty (tehtävä 44)
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

  });
};
