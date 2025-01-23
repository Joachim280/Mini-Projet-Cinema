// Import API functions
import { fetchMovieDetails } from './shared/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Movie.js script loaded successfully.');

  // Extract the movie ID from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  if (!movieId) {
    console.error('No movie ID provided in the URL.');
    document.body.innerHTML = '<h1>No movie ID provided.</h1>';
    return;
  }
  console.log(`Movie ID: ${movieId}`);

  // DOM elements
  const movieTitle = document.getElementById('movie-title');
  const moviePoster = document.getElementById('movie-poster');
  const moviePlot = document.getElementById('movie-plot');
  const movieGenre = document.getElementById('movie-genre');
  const movieActors = document.getElementById('movie-actors');
  const movieRatings = document.getElementById('movie-ratings');
  const movieDVD = document.getElementById('movie-dvd');

  // Ensure DOM elements exist
  if (!movieTitle || !moviePoster || !moviePlot || !movieGenre || !movieActors || !movieRatings || !movieDVD) {
    console.error('One or more DOM elements are missing.');
    document.body.innerHTML = '<h1>Error: Missing elements in the HTML.</h1>';
    return;
  }

  try {
    // Fetch movie details
    const movie = await fetchMovieDetails(movieId);

    if (!movie || movie.Response === 'False') {
      console.error('Movie details not found or response invalid.');
      movieTitle.textContent = 'Movie details not available.';
      return;
    }

    console.log('Movie details fetched:', movie);

    // Update the DOM elements with the movie data
    movieTitle.textContent = movie.Title || 'Title not available.';
    moviePoster.src = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300';
    moviePoster.alt = `Poster of ${movie.Title || 'Unknown movie'}`;
    moviePlot.textContent = movie.Plot || 'Plot not available.';
    movieGenre.textContent = movie.Genre || 'Genre not available.';
    movieActors.textContent = movie.Actors || 'Actors not available.';

    // Format ratings
    const ratingsText = movie.Ratings?.map(rating => `${rating.Source}: ${rating.Value}`).join(', ') || 'Ratings not available.';
    movieRatings.textContent = ratingsText;

    // Format DVD release date to dd/mm/yyyy
    const rawDvdDate = movie.DVD;
    if (rawDvdDate && rawDvdDate !== 'N/A') {
      const dvdDate = new Date(rawDvdDate);
      if (!isNaN(dvdDate)) {
        movieDVD.textContent = dvdDate.toLocaleDateString('fr-FR');
      } else {
        movieDVD.textContent = 'DVD release date format invalid.';
      }
    } else {
      movieDVD.textContent = 'DVD release date not available.';
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    movieTitle.textContent = 'Error loading movie details.';
  }
});
