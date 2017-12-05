var MovieLibraryApp = angular.module('MovieLibraryApp', ['firebase','ngRoute']); // Toteuta moduulisi tänne

MovieLibraryApp.config(function($routeProvider){
    // Lisää reitit tänne
    $routeProvider
        .when('/', {
            controller: 'ListMovieController',
            templateUrl: 'app/views/list.html'
        })
        .when('/movies', {
            controller: 'ListMovieController',
            templateUrl: 'app/views/list.html'
        })
        .when('/movies/new', {
            controller: 'AddMovieController',
            templateUrl: 'app/views/form.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});