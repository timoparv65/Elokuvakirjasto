/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.controller('EditMovieController', function($scope, FirebaseService, $routeParams, $location){
    FirebaseService.getMovie($routeParams.key, function(movie){
        //console.log("EditMovieController/FirebaseService.getMovie");
        $scope.movie = movie;
    });
    
    $scope.editMovie = function(movie){
        //console.log("EditMovieController/EditMovie");
        
        var toBeAdded = (movie.name !== undefined) && (movie.director !== undefined) && (movie.released !== undefined) && (movie.description !== undefined);
        if (toBeAdded){
            jsonObject = {
                name: movie.name,
                director: movie.director,
                released: movie.released,
                description: movie.description,
                $id: movie.$id
            };
            FirebaseService.editMovie(jsonObject);
            var path = '/movies/'.concat($routeParams.key);
            $location.path(path);
        }
    };
});
