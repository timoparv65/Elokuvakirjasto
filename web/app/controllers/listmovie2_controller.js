/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.controller('ListMovieController2', function($scope, currentAuth, FirebaseService, $location){ // tehtävä 46
    //console.log("ListMovieController2");
    
    if(!currentAuth){
        $location.path('/login');
    }
    
    $scope.movies = FirebaseService.getMovies();
    
    $scope.listMovies = function(){
        //console.log("ListMovieController/listMovies");
        return $scope.movies;
    };
    
    $scope.removeMovie = function(movie){
        //console.log("ListMovieController/removeMovie");
        FirebaseService.removeMovie(movie);
    };
});
