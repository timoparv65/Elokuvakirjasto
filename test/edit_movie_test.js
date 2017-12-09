//describe('Edit movie', function(){ // alkuperäinen
describe('EditMovieController', function(){
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
                    
                    // all omaa koodia
                    getMovie: function(key, done){
                        //console.log("FirebaseServiceMock/getMovie");
                        var index = -1;
                        for (var i = 0; i < movies.length; i++){
                            if (key === movies[i].$id){
                                index = i;
                                break;
                            }
                        }
                        if (index !== -1){
                            done(movies[index]);
                        } else {
                            done(null);
                        }
                    },
                    editMovie: function(movieObject){
                        //console.log("FirebaseServiceMock/editMovie");
                        var key = movieObject.$id;
                        var index = -1;
                        for (var i = 0; i < movies.length; i++){
                            if (key === movies[i].$id){
                                index = i;
                                break;
                            }
                        }
                        if (index !== -1){
                            movies.splice(index, 1);
                            movies.splice(index, 0, movieObject);
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
                controller = $controller('EditMovieController', {
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
  	* Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should fill the edit form with the current information about the movie', function(){
            //expect(true).toBe(false); // alkuperäinen
            FirebaseServiceMock.getMovie(
                RouteParamsMock.key, function(movie){
                    scope.movie = movie;
            });
            expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
            var movieExpected = {
                name: 'Pekka Puupää',
                director: 'Armas Lohikoski',
                released: '1953',
                description: 'Sarjan ensimmäinen elokuva',
                $id: 'abc123'
            };
            expect(scope.movie.name).toBe(movieExpected.name);
            expect(scope.movie.director).toBe(movieExpected.director);
            expect(scope.movie.released).toBe(movieExpected.released);
            expect(scope.movie.description).toBe(movieExpected.description);
            expect(scope.movie.$id).toBe(movieExpected.$id);
  	})

  	/* 
  	* Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to edit a movie by its name, director, release date and description', function(){
		//expect(true).toBe(false); // alkuperäinen
                var movieChanged = {
                    name: 'Pekka Puupää',
                    director: 'Armas Lohikoski',
                    released: '1954',
                    description: 'Sarjan ensimmäinen elokuva, luulisin',
                    $id: 'abc123'
                };
                scope.editMovie(movieChanged);
                expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();
                FirebaseServiceMock.getMovie(
                    RouteParamsMock.key, function(movie){
                        scope.movie = movie;
                });
                expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
                expect(scope.movie.name).toBe(movieChanged.name);
                expect(scope.movie.director).toBe(movieChanged.director);
                expect(scope.movie.released).toBe(movieChanged.released);
                expect(scope.movie.description).toBe(movieChanged.description);
                expect(scope.movie.$id).toBe(movieChanged.$id);
	});

	/*
	* Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
  	* käyttämällä not.toBeCalled-oletusta.
	*/
	it('should not be able to edit a movie if its name, director, release date or description is empty', function(){
		//expect(true).toBe(false); // alkuperäinen
                var movieChanged = {
                    name: 'Pekka Puupää',
                    director: 'Armas Lohikoski',
                    description: 'Sarjan ensimmäinen elokuva, luulisin',
                    $id: 'abc123'
                };
                scope.editMovie(movieChanged);
                expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
                expect(scope.movie.description).not.toBe(movieChanged.description);
	});
});