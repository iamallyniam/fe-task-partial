import { fetchGenres, fetchMovies } from './api'; // you may add functionality to these functions, but please use them
import './styles.css'; // have a look at this file and feel free to use the classes
import React from "react";
import {Movie} from "./components/movie.jsx";
import {Filter} from "./components/filter.jsx";

export default function App() {
  /**
   * This will be all the movies, sorted by popularity. Any filtering will be done from this list
   */
  const [movieList, setMovieList] = React.useState([]);
  /**
   * The filtered movie list based on selected genres and miniumum rating
   */
  const [movieListDisplay, setMovieListDisplay] = React.useState([]);
  /**
   * The list of genres that are available across all movies
   */
  const [genresList, setGenresList] = React.useState([]);
  /**
   * The genre data that has been picked by the user
   */
  const [genreDefaultDisplay, setGenreDefaultDisplay] = React.useState([]);
  /**
   * Default genre list
   */
  const [genresDisplayed, setGenresDisplayed] = React.useState([]);
  /**
   * The minimum rating that the user will set in the filter
   */
  const [minRating, setMinRating] = React.useState(3);
  /**
   * Perform data update based on filtering submission and reset
   */
  const [performUpdate, setPerformUpdate] = React.useState(false);
  /**
   * On first run the data for genres and movies is fetched. The movies are sorted by popularity and
   * set in a state. The genres list is reduced so that only genres that exist in the movies are displayed
   * to the user. I've created a data map of the genre ids and set them to all be selected for the filter
   * on first load. I map the genre titles on to the movie data.
   */
  React.useEffect(async () => {
    const movieData = await Promise.all([fetchMovies(), fetchGenres()]);
    const movies = movieData[0];
    const genres = movieData[1];
    const sortPop = movies.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    const validGenres = movies.reduce((acc, movie) => {
      const movieGenreIds = movie.genre_ids;
      movieGenreIds.forEach(id => {
        if(acc.indexOf(id) === -1){
          acc.push(id);
        }
      });
      return acc;
    }, []);
    const allGenres = [];
    const genreDefaultDisplay = [];
    const genreMap = genres.reduce((acc, genre) => {
      if(validGenres.indexOf(genre.id) > -1){
          acc[genre.id] = genre.name;
          genreDefaultDisplay.push(genre.id);
          allGenres.push(genre);
      }
      return acc;
    }, {});
    movies.forEach(movie => {
      movie.genreTitles = movie.genre_ids.map(id => {
        return genreMap[id];
      });
    });
    setGenresList(allGenres);
    setMovieList(sortPop);
    setMovieListDisplay(sortPop);
    setGenresDisplayed(genreDefaultDisplay);
    setGenreDefaultDisplay(genreDefaultDisplay);
  }, []);
  /**
   * Runs when the filter options have been submitted. I first check if the movie's rating meets the minimum
   * filter value. If it does, it continues to loop over genre movies that are assigned to the movie and when
   * a match is found by what's been checked in the filters the count increments. When the increment matches
   * the lengh of id's assigned to the movie then we can add this movie to the update display movie list.
   */
  const filteredMovies = React.useCallback((evt => {
    
    const newMovies = movieList.filter(movie => {
      let hasMatch = false;
      if(movie.vote_average >= minRating){
        let matchCount = 0;
        const movieGenres = movie.genre_ids;
        const matchingGenres = movieGenres.length;
        for(let i = 0; i < movieGenres.length; i++){
          const genreId = movieGenres[i];
          matchCount += genresDisplayed.indexOf(genreId) > -1 ? 1 : 0;
          if(matchCount === matchingGenres){
            hasMatch = true;
            break;
          }
        }
      }
      return hasMatch;
    });
    setMovieListDisplay(newMovies);
    setPerformUpdate(false);
    
  }), [movieList, setMovieListDisplay, genresDisplayed, minRating]);
  
  /**
   * Accessible solution for keyboard and screen reader users. When the list is updated the
   * focus is given to the first item in the updated list. If not items are returned focus will
   * remain in the page.
   */
  const firstItemInList = React.createRef();
  React.useEffect(() => {
    if(firstItemInList.current){
      firstItemInList.current.focus();;
    }
  }, [movieListDisplay]);
  /**
   * Triggers a reset of the movie data
   */
   React.useEffect(() => {
     if(performUpdate){
      filteredMovies();
     }
   }, [performUpdate])
  /**
   * Show a loading message until the responses from the server come back. A animation after a certain wait
   * time would be appropriate, as well as error handling messages should the fetch requests fail.
   */
  return(
    <>
    <header className="pageHeader">
      <h1 className="pageTitle">Now playing</h1>
    </header>
    <main>
    <Filter
    movieListDisplay={movieListDisplay}
    genresDisplayed={genresDisplayed}
    genresList={genresList}
    genreDefaultDisplay={genreDefaultDisplay}
    setMinRating={setMinRating}
    setPerformUpdate={setPerformUpdate}
    minRating={minRating}
    setGenresDisplayed={setGenresDisplayed} />
    <section className="dataArea">
      <h2 aria-live="polite" className="dataAreaTitle">Showing {movieListDisplay.length} of {movieList.length} movies</h2>
      {movieList.length > 0 && (
        <ul className="dataAreaList">
        {movieListDisplay.map((movie, ind) => {
          return <Movie key={`movie-${ind}`} {...movie} ref={ind === 0 ? firstItemInList : null} />
        })}
        </ul>
      )}
    </section>
    {movieList.length === 0 && (<p>Loading, please wait</p>)}
    </main>
    </>
  );
}
