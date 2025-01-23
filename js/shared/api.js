// API key and base URL
const API_KEY = "b7192e10"; // Your API key
const BASE_URL = "https://www.omdbapi.com/";

// Function to search for movies by title
export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search; // Returns the found movies
    } else {
      console.error("No movies found:", data.Error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Function to fetch movie details by ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
    if (data.Response === "True") {
      return data; // Returns the movie details
    } else {
      console.error("Details not available:", data.Error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
