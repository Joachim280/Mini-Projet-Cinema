// Import API functions
import { fetchMovies, fetchMovieDetails } from './shared/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const moviesContainer = document.getElementById('movies-container');
  const loadMoreButton = document.getElementById('load-more');
  let currentPage = 1;

  // Function to display movies in the container
  const displayMovies = async (movies) => {
    for (const movie of movies) {
      // Fetch movie details
      const details = await fetchMovieDetails(movie.imdbID);

      // Create an element for each movie
      const movieElement = document.createElement('div');
      movieElement.className = 'movie-item';
      movieElement.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>Summary: ${details?.Plot || 'Summary not available.'}</p>
        <a href="03-movie.html?id=${movie.imdbID}">See details</a>
      `;
      moviesContainer.appendChild(movieElement);
    }
  };

  // Load specific movies
  const loadSpecificMovies = async () => {
    try {
      // Load a Transformers movie, The Count of Monte Cristo (2024), and Conjuring
      const movies = [
        ...(await fetchMovies('Transformers', 1)).slice(0, 1), // 1st Transformers movie
        ...(await fetchMovies('The Count of Monte Cristo', 1)).filter(movie => movie.Year === '2024'),
        ...(await fetchMovies('Conjuring', 1)).slice(0, 1) // 1st Conjuring movie
      ];
      if (movies.length > 0) {
        await displayMovies(movies);
      } else {
        console.error('No specific movies found.');
      }
    } catch (error) {
      console.error('Error loading specific movies:', error);
    }
  };

  // Load more movies from 2024
  const loadMoreMovies2024 = async () => {
    try {
      const movies2024 = (await fetchMovies('2024', currentPage)).filter(movie => movie.Year === '2024');
      if (movies2024.length > 0) {
        await displayMovies(movies2024);
      } else {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = 'No more movies to display';
      }
    } catch (error) {
      console.error('Error loading movies from 2024:', error);
    }
  };

  // Event listener for the "Load more" button
  loadMoreButton.addEventListener('click', () => {
    currentPage++;
    loadMoreMovies2024();
  });

  // Load specific movies on page load
  loadSpecificMovies();
});
