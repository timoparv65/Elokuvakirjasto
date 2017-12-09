/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.service('FirebaseService', function($firebaseArray){
    // Keskustele Firebasen kanssa tämän palvelun avulla

    // Tehtävä 43
    var OMA_FIREBASE = 'https://FIREBASE_KAYTTAJANI.firebaseio.com'; // alkuperäinen
    var MOVIELIBRARY_OSOITE = OMA_FIREBASE.concat('/movies');
    //var OMA_FIREBASE = 'https://my-first-app-a52e5.firebaseio.com';
    //var MOVIELIBRARY_OSOITE = OMA_FIREBASE.concat('/movies');
    var firebaseRef = new Firebase(MOVIELIBRARY_OSOITE);
    var movies = $firebaseArray(firebaseRef);
    
    this.getMovies = function(){
        //console.log("FirebaseService/getMovies");
        return movies;
    };
    
    this.addMovie = function(movie){
        //console.log("FirebaseService/addMovie");
        movies.$add(movie);
    };
    
    // Tehtävä 44
    this.getMovie = function(key, done){
        //console.log("FirebaseService/getMovie");
        movies.$loaded(function(){
            //console.log("FirebaseService/getMovie: loaded");
            done(movies.$getRecord(key));
        });
        /* TÄTÄ KÄYTETTY PAIKALLISESTI ELI LOCALHOSTissa
        done(movies.$getRecord(key));
        */
    };
    
    // Tehtävä 44
    this.editMovie = function(movie){
        //console.log("FirebaseService/editMovie");
        movies.$save(movie);
    };
    
    // Tehtävä 44
    this.removeMovie = function(movie){
        //console.log("FirebaseService/removeMovie");
        movies.$remove(movie);
    };
});
