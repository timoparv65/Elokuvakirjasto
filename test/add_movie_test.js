//describe('Add movie', function(){ // alkuperäinen
describe('AddMovieController', function(){
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
	    // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
            spyOn(FirebaseServiceMock, 'addMovie').and.callThrough(); // omaa koodia

            // Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
                scope = $rootScope.$new();
                // Muista vaihtaa oikea kontrollerin nimi!
                //controller = $controller('MyAwesomeController', { // alkuperäinen
                controller = $controller('AddMovieController', { // omaa koodia
                  $scope: scope,
                  FirebaseService: FirebaseServiceMock
                });
	    });
        });

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  	* on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  	* toBeCalled-oletusta.
	*/
	it('should be able to add a movie by its name, director, release date and description', function(){
		//expect(true).toBe(false); // alkuperäinen
                var movieInfo = {
                    name: 'Saturday night fever',
                    director: 'John Badham',
                    released: '1977',
                    description: 'A huge commercial success, the film significantly helped to popularize disco music around the world and made Travolta, already well known from his role on TVs Welcome Back, Kotter, a household name. The Saturday Night Fever soundtrack, featuring disco songs by the Bee Gees, is one of the best-selling soundtracks of all time'
                };
                scope.addMovie(movieInfo);
                // Kutsutaan toHaveBeenCalled-funktiota, jolloin oletamme, että addMovie funktiota on kutsuttu
                expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
                var moviesFromFirebase = FirebaseServiceMock.getMovies();
                expect(moviesFromFirebase.length).toBe(4);
                expect(moviesFromFirebase[3].name).toBe(movieInfo.name);
                expect(moviesFromFirebase[3].director).toBe(movieInfo.director);
                expect(moviesFromFirebase[3].released).toBe(movieInfo.released);
                expect(moviesFromFirebase[3].description).toBe(movieInfo.description);
	});

	/*	
	* Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	* EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	* not.toBeCalled-oletusta (muista not-negaatio!).
	*/
	it('should not be able to add a movie if its name, director, release date or description is empty', function(){
		//expect(true).toBe(false); // alkuperäinen
                var movieInfo2 = {
                    name: 'Saturday night fever',
                    released: '1977',
                    description: 'A huge commercial success, the film significantly helped to popularize disco music around the world and made Travolta, already well known from his role on TVs Welcome Back, Kotter, a household name. The Saturday Night Fever soundtrack, featuring disco songs by the Bee Gees, is one of the best-selling soundtracks of all time'
                };
                scope.addMovie(movieInfo2);
                // Kutsutaan not.toHaveBeenCalled-funktiota, jolloin oletamme, että addMovie funktiota ei ole kutsuttu
                expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
                var moviesFromFirebase = FirebaseServiceMock.getMovies();
                expect(moviesFromFirebase.length).toBe(3);
	});
});