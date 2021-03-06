/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.controller('ListMovieController', function($scope, FirebaseService){
    console.log("ListMovieController");  
    
    $scope.movies = FirebaseService.getMovies();
    
    $scope.listMovies = function(){
        console.log("ListMovieController/listMovies");
        return $scope.movies;
    };
    
    $scope.removeMovie = function(movie){
        console.log("ListMovieController/removeMovie");
        FirebaseService.removeMovie(movie);
    };
});
