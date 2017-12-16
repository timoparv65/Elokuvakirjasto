/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.controller('SearchMoviesImdbController', function($scope, APIService, $routeParams, $location){
    // Tehtävä 45
    //console.log("SearchMoviesImdbController");
    
    $scope.movies = "";
    $scope.hideResult = true;
    
    $scope.searchMovie = function(movie){
        //console.log("SearchMoviesImdbController/searchMovie");
        $scope.hideResult = true;
        movie.moviesFound = false;
        var toBeSearch = (movie.name !== undefined) && (movie.release !== undefined);
        //console.log("toBeSearch = " + toBeSearch);
        if (toBeSearch){
            APIService.findMovie(movie.name, movie.release).then(
                function successCallback(response){
                    $scope.hideResult = false;
                    //console.log("response.data.Search");
                    //console.log(response.data.Search);
                    $scope.movies = response.data.Search;
                    //console.log($scope.movies[0]);
                    if ($scope.movies.length > 0){
                        movie.moviesFound = true;
                    } else{
                        movie.moviesFound = false;
                    }
                },
                function errorCallback(response){
                    //console.log("error");
                    //console.log(response);
                    $scope.movies = [];
                    $scope.hideResult = true;
                    movie.moviesFound = false;
                }
            );
        }
    };
    
});

