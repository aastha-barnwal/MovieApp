import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Movie {
    id: number;
    name: string;
    releaseDate: string;
    averageRating: number;
}

interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

// Define the initial state using that type
const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
};

// Create the async thunk
export const fetchMovies = createAsyncThunk<Movie[], void>(
    'movies/fetchMovies',
    async () => {
        const response = await fetch('http://localhost:3000/movies'); // Update with your backend URL
        return (await response.json()) as Movie[]; // Make sure to cast the response
    }
);

// Create the movie slice
const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

// Export the actions and reducer
export const movieReducer = movieSlice.reducer;
