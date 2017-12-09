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
            templateUrl: 'app/views/addForm.html'
        })
        .when('/movies/:key', { // Tehtävä 44
            controller: 'ShowMovieController',
            templateUrl: 'app/views/show.html'
        })
        .when('/movies/:key/edit', { // Tehtävä 44
            controller: 'EditMovieController',
            templateUrl: 'app/views/editForm.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});