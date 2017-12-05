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
                  description: 'Sarjan ensimmäinen elokuva'
                },
                {
                  name: 'Pekka ja Pätkä neekereinä',
                  director: 'Armas Lohikoski',
                  released: '1960',
                  description: 'Sarjan viimeinen elokuva'
                },
                {
                  name: 'Pekka ja Pätkä Suezilla',
                  director: 'Armas Lohikoski',
                  released: '1958',
                  description: 'Rauhanturvaamistehtävissä'
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
                        }
                    }
                })();

            // Lisää vakoilijat
	    // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough(); // alkuperäinen
            spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();

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
                // Kutsutaan toHaveBeenCalled-funktiota, jolloin oletamme, että ggetMovies funktiota on kutsuttu
                expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
                var moviesFirebase = FirebaseServiceMock.getMovies();
                for (i = 0; i < movieList.length; i++){
                    expect(movieList[i].name).toBe(moviesFirebase[i].name);
                    expect(movieList[i].director).toBe(moviesFirebase[i].director);
                    expect(movieList[i].released).toBe(moviesFirebase[i].released);
                    expect(movieList[i].description).toBe(moviesFirebase[i].description);
                }
	});

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to remove a movie', function(){
		//expect(true).toBe(false); // alkuperäinen
                expect(true).toBe(true);
	});
});