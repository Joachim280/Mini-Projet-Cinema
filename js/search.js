// Importer les fonctions nécessaires depuis api.js
import { fetchMovies } from './shared/api.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const searchResults = document.getElementById('search-results');
  const loadMoreButton = document.getElementById('load-more-results');
  let currentPage = 1;
  let currentQuery = '';

  // Fonction pour afficher les résultats
  const displayResults = (movies) => {
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.className = 'movie-item';
      movieElement.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <a href="03-movie.html?id=${movie.imdbID}">See Details</a>
      `;
      searchResults.appendChild(movieElement);
    });
  };

  // Fonction pour effectuer une recherche
  const searchMovies = async (query, page = 1) => {
    try {
      const movies = await fetchMovies(query, page);
      if (movies.length > 0) {
        displayResults(movies);
      } else if (page === 1) {
        searchResults.innerHTML = `<p>No movies found for "${query}".</p>`;
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  // Gestionnaire pour la barre de recherche
  searchBar.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query && query !== currentQuery) {
      currentQuery = query;
      currentPage = 1;
      searchResults.innerHTML = ''; // Réinitialiser les résultats
      await searchMovies(currentQuery, currentPage);
    } else if (!query) {
      searchResults.innerHTML = ''; // Effacer les résultats si le champ est vide
    }
  });

  // Gestionnaire pour le bouton "Load More Results"
  loadMoreButton.addEventListener('click', async () => {
    if (currentQuery) {
      currentPage++;
      await searchMovies(currentQuery, currentPage);
    }
  });
});
