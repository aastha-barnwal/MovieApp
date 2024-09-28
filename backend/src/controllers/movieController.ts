import { Request, Response } from 'express';
import pool from '../config/db';
import { Movie } from '../models/movie';

// Create a new movie
export const createMovie = async (req: Request, res: Response) => {
  const { name, release_date }: Movie = req.body;  // Use Movie type here
  
  try {
    
    const [result] = await pool.execute(
      'INSERT INTO Movie (name, release_date) VALUES (?, ?)',
      [name, release_date]
    );
    
    res.status(200).json({ message: 'Movie created successfully', movieId: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create movie', message: (error as any).message });
  }
};

// Get all movies
export const getMovies = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const [movies] = await pool.execute('SELECT * FROM Movie');
    res.json(movies as Movie[]);  // Cast the result as an array of Movie
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve movies' });
  }
};

// Get movie by ID
export const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    console.log("abc 35");
    const [movie] = await pool.execute('SELECT * FROM Movie WHERE movie_id = ?', [id]);
    res.json((movie as Movie[])[0]);  // Cast the result as Movie and return the first item
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve movie' });
  }
};

// Update a movie
export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, release_date }: Movie = req.body;  // Use Movie type here
  
  try {
    await pool.execute('UPDATE Movie SET name = ?, release_date = ? WHERE movie_id = ?', [name, release_date, id]);
    res.json({ message: 'Movie updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update movie' });
  }
};

// Delete a movie
export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    await pool.execute('DELETE FROM Movie WHERE movie_id = ?', [id]);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
};
