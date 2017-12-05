/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

MovieLibraryApp.service('FirebaseService', function($firebaseArray){
    // Keskustele Firebasen kanssa tämän palvelun avulla

    var OMA_FIREBASE = 'https://FIREBASE_KAYTTAJANI.firebaseio.com'; // alkuperäinen
    var MOVIELIBRARY_OSOITE = OMA_FIREBASE.concat('/movies');
    //var OMA_FIREBASE = 'https://my-first-app-a52e5.firebaseio.com';
    //var MOVIELIBRARY_OSOITE = OMA_FIREBASE.concat('/movies');
    var firebaseRef = new Firebase(MOVIELIBRARY_OSOITE);
    var movies = $firebaseArray(firebaseRef);
    
    this.getMovies = function(){
        return movies;
    };
    
    this.addMovie = function(movie){
        movies.$add(movie);
    };
});
