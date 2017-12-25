/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Tehtävä 46
MovieLibraryApp.controller('UserController', function($scope, AuthenticationService, $location){
    //console.log("UserController");
    
    $scope.logIn = function(){
        //console.log("UserController/logIn");
        AuthenticationService.logUserIn($scope.email, $scope.password)
            .then(function(){
                //console.log("AuthenticationService/logUserIn: succesfull");
                $location.path('/movies');
            })
            .catch(function(error){
                //console.log("AuthenticationService/logUserIn: failed");
                // Handle Errors here.
                //var errorCode = error.code;
                //var errorMessage = error.message;
                //console.log(errorCode);
                //console.log(errorMessage);
                $scope.message = 'Väärä sähköpostiosoite tai salasana!';
            });
    };

    $scope.register = function(){
        //console.log("UserController/register");
        AuthenticationService.createUser($scope.newEmail, $scope.newPassword)
            .then(function(){
                AuthenticationService.logUserIn($scope.newEmail, $scope.newPassword)
                    .then(function(){
                        //console.log("AuthenticationService/logUserIn: succesfull");
                        $location.path('/movies');
                    });
            })
            .catch(function(error){
                //console.log("AuthenticationService/logUserIn: failed");
                //var errorCode = error.code;
                //var errorMessage = error.message;
                //console.log(errorCode);
                //console.log(errorMessage);
                $scope.message = 'Tapahtui virhe! Yritä uudestaan';
            });
    };
});

