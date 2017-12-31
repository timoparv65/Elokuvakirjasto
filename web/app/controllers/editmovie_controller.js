/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.controller('EditMovieController', function($scope, currentAuth, FirebaseService, $routeParams, $location){ // tehtävä 46
    //console.log("EditMovieController");
    
    if(!currentAuth){
        $location.path('/login');
    }
    
    $scope.navbarData = {
        urls:['#/movies'],
        texts:['Elokuvat'],
        classes:['active']
    };
    
    FirebaseService.getMovie($routeParams.key, function(movie){
        //console.log("EditMovieController/FirebaseService.getMovie");
        $scope.movie = movie;
    });
    
    $scope.editMovie = function(movie){
        //console.log("EditMovieController/EditMovie");
        
        var toBeAdded = (movie.name !== undefined) && (movie.director !== undefined) && (movie.released !== undefined) && (movie.description !== undefined);
        if (toBeAdded){
            FirebaseService.editMovie(movie);
            var path = '/movies/'.concat($routeParams.key);
            $location.path(path);
        }
    };
});
