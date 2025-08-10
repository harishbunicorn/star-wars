import axios from 'axios';
import { Movie } from '@/types/movie';

const BASE_URL = 'https://swapi.info/api';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again');
    }
    if (!error.response) {
      throw new Error('Network error - please check your connection');
    }
    if (error.response.status >= 500) {
      throw new Error('Server error - please try again later');
    }
    if (error.response.status === 404) {
      throw new Error('Resource not found');
    }
    throw new Error('An unexpected error occurred');
  }
);

export const movieAPI = {
  getAllMovies: async (): Promise<Movie[]> => {
    try {
      const response = await api.get<Movie[]>('/films');
      return response.data;
    } catch (error) {
      // Fallback to local API route if direct API fails
      try {
        const fallbackResponse = await axios.get<Movie[]>('/api/films');
        return fallbackResponse.data;
      } catch {
        throw error; // Throw original error
      }
    }
  },

  getMovieById: async (id: string): Promise<Movie> => {
    try {
      const response = await api.get<Movie>(`/films/${id}`);
      return response.data;
    } catch (error) {
      // Fallback to local API route if direct API fails
      try {
        const fallbackResponse = await axios.get<Movie>(`/api/films?id=${id}`);
        return fallbackResponse.data;
      } catch {
        throw error; // Throw original error
      }
    }
  },

  getMovieByUrl: async (url: string): Promise<Movie> => {
    try {
      const response = await axios.get<Movie>(url);
      return response.data;
    } catch (error) {
      // Extract ID from URL and use fallback
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2]; // Get ID from URL
      if (id) {
        try {
          const fallbackResponse = await axios.get<Movie>(`/api/films?id=${id}`);
          return fallbackResponse.data;
        } catch {
          throw error; // Throw original error
        }
      }
      throw error;
    }
  },
};