/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.controller('ListMovieController2', function($scope, currentAuth, FirebaseService, APIService, $location){ // tehtävä 46
    //console.log("ListMovieController2");
    
    if(!currentAuth){
        $location.path('/login');
    }
    
    $scope.navbarData = {
        urls:['#/movies'],
        texts:['Elokuvat'],
        classes:['active']
    };
  
    $scope.movies = FirebaseService.getMovies();
    
    $scope.foundMovies = "";
    $scope.hideResult = true;
    
    $scope.searchMovie = function(movie){
        //console.log("ListMovieController2/searchMovie");
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
                    $scope.foundMovies = response.data.Search;
                    //console.log($scope.foundMovies[0]);
                    if ($scope.foundMovies.length > 0){
                        movie.moviesFound = true;
                    } else{
                        movie.moviesFound = false;
                    }
                },
                function errorCallback(response){
                    //console.log("error");
                    //console.log(response);
                    $scope.foundMovies = [];
                    $scope.hideResult = true;
                    movie.moviesFound = false;
                }
            );
        }
    };
    
    $scope.listMovies = function(){
        //console.log("ListMovieController2/listMovies");
        return $scope.movies;
    };
    
    $scope.removeMovie = function(movie){
        //console.log("ListMovieController2/removeMovie");
        FirebaseService.removeMovie(movie);
    };
    
    $scope.newMovie = function(movie){
        //console.log("ListMovieController2/newMovie");
        $location.path('/movies/new');
    };
});
