var MovieLibraryApp = angular.module('MovieLibraryApp', ['firebase','ngRoute','ng']); // Toteuta moduulisi tänne

MovieLibraryApp.config(function($routeProvider){
    // Lisää reitit tänne
    //console.log("MovieLibraryApp.config(function($routeProvider){");
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
        .when('/movies/imdb', { // Tehtävä 45
            controller: 'SearchMoviesImdbController',
            templateUrl: 'app/views/searchForm.html'
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

MovieLibraryApp.config(['$httpProvider', function($httpProvider) {
    //console.log("MovieLibraryApp.config(['$httpProvider', function($httpProvider) {");
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);