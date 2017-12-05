/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.controller('AddMovieController', function($scope, FirebaseService, $routeParams, $location){
    $scope.addMovie = function(movie){
        //console.log("AddMovieController/addMovie");
        var movieJson = {
            name: movie.name,
            director: movie.director,
            released: movie.released,
            description: movie.description
        };
        
        var toBeAdded = (movie.name !== undefined) && (movie.director !== undefined) && (movie.released !== undefined) && (movie.description !== undefined);
        if (toBeAdded){
            FirebaseService.addMovie(movieJson);
            $location.path('/movies');
        }
    }
});
