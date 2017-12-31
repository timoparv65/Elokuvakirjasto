/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Tehtävä 46
MovieLibraryApp.service('AuthenticationService', function($firebaseAuth){
    //console.log("AuthenticationService");
    
    //var OMA_FIREBASE = 'https://my-first-app-a52e5.firebaseio.com';
    var OMA_FIREBASE = config.databaseURL; // tehtävä 46
    var firebaseRef = new Firebase(OMA_FIREBASE);
    var firebaseAuth = $firebaseAuth(firebaseRef);

    this.logUserIn = function(email, password){
        //console.log("AuthenticationService/logUserIn");
        return firebaseAuth.$authWithPassword({
            email: email,
            password: password
        });
        
       //return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    this.createUser = function(email, password){
        //console.log("AuthenticationService/createUser");
        return firebaseAuth.$createUser({
            email: email,
            password: password
        });
        
        //return firebase.auth().createUserWithEmailAndPassword(email, password);
    };
    
    this.checkLoggedIn = function(){
        //console.log("AuthenticationService/checkLoggedIn");
        return firebaseAuth.$waitForAuth();
    };
    
    this.logUserOut = function(){
        //console.log("AuthenticationService/logUserOut");
        firebaseAuth.$unauth();
        //firebase.auth().signOut();
    };

    this.getUserLoggedIn = function(){
        //console.log("AuthenticationService/getUserLoggedIn");
        return firebaseAuth.$getAuth();
        //return firebase.auth().currentUser;
    };
});

