/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.controller('ShowMovieController', function($scope, FirebaseService, $routeParams, $location){
    FirebaseService.getMovie($routeParams.key, function(movie){
        console.log("ShowMovieController/FirebaseService.getMovie");
        $scope.movie = movie;
    });
    
    $scope.showMovie = function(){
        console.log("ShowMovieController/showMovie");
        return $scope.movie;
    };
    
    $scope.editMovie = function(){
        console.log("ShowMovieController/editMovie");
        var path = '/movies/'.concat($routeParams.key).concat('/edit');
        $location.path(path);
    };
});
