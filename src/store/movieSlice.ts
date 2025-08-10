import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieState } from '@/types/movie';
import { movieAPI } from '@/services/api';

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const movies = await movieAPI.getAllMovies();
      return movies;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch movies');
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: string, { rejectWithValue }) => {
    try {
      const movie = await movieAPI.getMovieById(id);
      return movie;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch movie');
    }
  }
);

export const fetchMovieByUrl = createAsyncThunk(
  'movies/fetchMovieByUrl',
  async (url: string, { rejectWithValue }) => {
    try {
      const movie = await movieAPI.getMovieByUrl(url);
      return movie;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch movie');
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setSelectedMovie: (state, action: PayloadAction<Movie>) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch movie by URL
      .addCase(fetchMovieByUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieByUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieByUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedMovie, setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;