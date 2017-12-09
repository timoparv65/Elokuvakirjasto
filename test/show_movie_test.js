//describe('Show movie', function(){ // alkuperäinen
describe('ShowMovieController', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function(){
            // Lisää moduulisi nimi tähän
            //module('MyAwesomeModule'); // alkuperäinen
            module('MovieLibraryApp');
            
            // alla omaa koodia
            // Nämä viestit esittävät Firebasessa olevia viestejä
            var movies = [
                {
                  name: 'Pekka Puupää',
                  director: 'Armas Lohikoski',
                  released: '1953',
                  description: 'Sarjan ensimmäinen elokuva',
                  $id: 'abc123'
                },
                {
                  name: 'Pekka ja Pätkä neekereinä',
                  director: 'Armas Lohikoski',
                  released: '1960',
                  description: 'Sarjan viimeinen elokuva',
                  $id: 'def456'
                },
                {
                  name: 'Pekka ja Pätkä Suezilla',
                  director: 'Armas Lohikoski',
                  released: '1958',
                  description: 'Rauhanturvaamistehtävissä',
                  $id: 'ghi789'
                }
              ];

            FirebaseServiceMock = (function(){
                return {
                    // Toteuta FirebaseServicen mockatut metodit tähän
                    
                    // alla omaa koodia
                    editMovie: function(movie){
                        var index = -1;
                        for (var i = 0; i < movies.length; i++){
                            if (movie.$id === movies[i].$id){
                                index = i;
                                break;
                            }
                        }
                        if (index !== -1){
                            movies.splice(index, 1);
                            movies.splice(index, 0, movie);
                        }
                    },
                    getMovie: function(key, done){
                        var index = -1;
                        for (var i = 0; i < movies.length; i++){
                            if (key === movies[i].$id){
                                index = i;
                                break;
                            }
                        }
                        if (index !== -1){
                            return done(movies[index]);
                        } else{
                            return done(null);
                        }
                    }
                }
            })();

            RouteParamsMock = (function(){
                return {
                    // Toteuta mockattu $routeParams-muuttuja tähän
                    
                    // alla omaa koodia
                    key: 'abc123'
                }
            })();

            // Lisää vakoilijat
            // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough(); // alkuperäinen
            spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
            spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();

            // Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
                scope = $rootScope.$new();
                // Muista vaihtaa oikea kontrollerin nimi!
                //controller = $controller('MyAwesomeController', { // alkuperäinen
                controller = $controller('ShowMovieController', {
                    $scope: scope,
                    FirebaseService: FirebaseServiceMock,
                    $routeParams: RouteParamsMock
                });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/* 
  	* Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should show current movie from Firebase', function(){
            //expect(true).toBe(false); // alkuperäinen
            FirebaseServiceMock.getMovie(
                RouteParamsMock.key, function(movie){
                    scope.movie = movie;
            });
            expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
            var movie = scope.showMovie();
            expect(movie.$id).toBe(scope.movie.$id);
	});
});