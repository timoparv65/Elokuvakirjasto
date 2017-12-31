/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.controller('ListMovieController', function($scope, FirebaseService, APIService, $location){ // tehtävä 46
    //console.log("ListMovieController");
  
    $scope.movies = FirebaseService.getMovies();
    
    $scope.foundMovies = "";
    $scope.hideResult = true;
    
    $scope.listMovies = function(){
        //console.log("ListMovieController/listMovies");
        return $scope.movies;
    };
    
    $scope.logIn = function(){
        //console.log("ListMovieController/logIn");
        $location.path('/login');
    };

});

