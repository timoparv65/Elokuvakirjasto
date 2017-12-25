//var MovieLibraryApp = angular.module('MovieLibraryApp', ['firebase','ngRoute','ng']); // Toteuta moduulisi tänne
var MovieLibraryApp = angular.module('MovieLibraryApp', ['firebase','ngRoute','ng']); // Toteuta moduulisi tänne

MovieLibraryApp.config(function($routeProvider){
    // Lisää reitit tänne
    //console.log("MovieLibraryApp.config(function($routeProvider){");
    $routeProvider
        .when('/', {
            controller: 'ListMovieController',
            templateUrl: 'app/views/list.html'
            /* Sallitaan elokuvaresurssien likeminen kaikille
            resolve: { // tehtävä 46
                currentAuth: function(AuthenticationService) {
                  return AuthenticationService.checkLoggedIn();
                }
            }*/
        })
        .when('/login', {
            controller: 'UserController',
            templateUrl: 'app/views/userForm.html'
        })
        .when('/movies', {
            controller: 'ListMovieController2',
            templateUrl: 'app/views/list2.html',
            resolve: { // tehtävä 46
                currentAuth: function(AuthenticationService) {
                  return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/new', {
            controller: 'AddMovieController',
            templateUrl: 'app/views/addForm.html',
            resolve: { // tehtävä 46
                currentAuth: function(AuthenticationService) {
                  return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/imdb', { // Tehtävä 45
            controller: 'SearchMoviesImdbController',
            templateUrl: 'app/views/searchForm.html',
            resolve: { // tehtävä 46
                currentAuth: function(AuthenticationService) {
                  return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/:key', { // Tehtävä 44
            controller: 'ShowMovieController',
            templateUrl: 'app/views/show.html',
            resolve: { // tehtävä 46
                currentAuth: function(AuthenticationService) {
                  return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .when('/movies/:key/edit', { // Tehtävä 44
            controller: 'EditMovieController',
            templateUrl: 'app/views/editForm.html',
            resolve: { // tehtävä 46
                currentAuth: function(AuthenticationService) {
                  return AuthenticationService.checkLoggedIn();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});

MovieLibraryApp.config(['$httpProvider', function($httpProvider) {
    //console.log("MovieLibraryApp.config(['$httpProvider', function($httpProvider) {");
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

MovieLibraryApp.run(function(AuthenticationService, $rootScope){ // Tehtävä 46
    //console.log("MovieLibraryApp.run(function(AuthenticationService, $rootScope){");
    $rootScope.logOut = function(){
        //console.log("MovieLibraryApp.run(function(AuthenticationService, $rootScope){/..logOut");
      AuthenticationService.logUserOut();
    };

    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});

var EMAILADDRESS_REGEXP = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
MovieLibraryApp.directive('emailaddress', function() {
    //console.log("MovieLibraryApp.directive('emailaddress', function() {");
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.emailaddress = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }
                 
                if (EMAILADDRESS_REGEXP.test(viewValue)) {
                    // it is valid
                    return true;
                }
 
                // it is invalid
                return false;
            };
        }
    };
});