//describe('Movie list', function(){ // alkuperäinen
describe('ListMovieController', function(){
	var controller, scope;

	var FirebaseServiceMock;

  	beforeEach(function(){
            // Lisää moduulisi nimi tähän
            //module('MyAwesomeModule'); // alkuperäinen
            module('MovieLibraryApp'); // omaa koodia
            
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
                        addMovie: function(movie){
                            movies.push(movie);
                          },
                        getMovies: function(){
                            return movies;
                        },
                        removeMovie: function(movie){ // lisätty, tehtävä 44
                            var key = movie.$id;
                            var index = -1;
                            for (var i = 0; i < movies.length; i++){
                                if (key === movies[i].$id){
                                    index = i;
                                    break;
                                }
                            }
                            if (index !== -1){
                                movies.splice(index, 1);
                            }
                        }
                    }
                })();

            // Lisää vakoilijat
	    // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough(); // alkuperäinen
            spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
            spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough(); // tehtävä 44

            // Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
                scope = $rootScope.$new();
                // Muista vaihtaa oikea kontrollerin nimi!
                //controller = $controller('MyAwesomeController', { // alkuperäinen
                controller = $controller('ListMovieController', { // omaa koodia
                  $scope: scope,
                  FirebaseService: FirebaseServiceMock
                });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/ 
	it('should list all movies from the Firebase', function(){
            //expect(true).toBe(false); // alkuperäinen
            var movieList = scope.listMovies();
            // Kutsutaan toHaveBeenCalled-funktiota, jolloin oletamme, että getMovies funktiota on kutsuttu
            expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
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
            for (i = 0; i < movieList.length; i++){
                expect(movieList[i].$id).toBe(movies[i].$id);
            }
	});

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to remove a movie', function(){
            //expect(true).toBe(false); // alkuperäinen
            var movieList = scope.listMovies();
            expect(movieList.length).toBe(3);
            var movie0 = movieList[0];
            scope.removeMovie(movie0);
            // Kutsutaan toHaveBeenCalled-funktiota, jolloin oletamme, että removeMovie funktiota on kutsuttu
            expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
            var movieList = scope.listMovies();
            expect(movieList.length).toBe(2);
            for (var i = 0; i < movieList.length; i++){
                expect(movieList[i].$id).not.toBe(movie0.$id);
            }
	});
});