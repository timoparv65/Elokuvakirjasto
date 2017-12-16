/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
MovieLibraryApp.service('APIService', function($http){
    // Tehtävä 45
    //console.log("APIService");
    
    var OMDB_BASE = 'http://www.omdbapi.com/?i=tt3896198&apikey=86345ac';
    
    this.findMovie = function(name, release){
        //console.log("APIService/findMovie");
        var response = $http.get(OMDB_BASE, { params: { s: name, y: release } });
        //console.log(response);
        return response;
        //return $http.get(OMDB_BASE, { params: { s: name } });
    };
});

