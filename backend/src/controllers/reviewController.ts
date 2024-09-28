import { Request, Response } from 'express';
import pool from '../config/db';
import { Review } from '../models/review';

// Create a new review
export const createReview = async (req: Request, res: Response) => {
  const { movie_id, reviewer_name, rating, comments }: Review = req.body; // Use Review type

  try {
    const [result] = await pool.execute(
      'INSERT INTO Review (movie_id, reviewer_name, rating, comments) VALUES (?, ?, ?, ?)',
      [movie_id, reviewer_name, rating, comments]
    );
    res.status(201).json({ message: 'Review created successfully', reviewId: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Get all reviews
export const getReviews = async (req: Request, res: Response) => {
  try {
    const [reviews] = await pool.execute('SELECT * FROM Review');
    res.json(reviews as Review[]); // Cast the result as an array of Review
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

// Get reviews by movie ID
export const getReviewsByMovieId = async (req: Request, res: Response) => {
  const { movie_id } = req.params;

  try {
    const [reviews] = await pool.execute('SELECT * FROM Review WHERE movie_id = ?', [movie_id]);
    res.json(reviews as Review[]); // Cast the result as an array of Review
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reviewer_name, rating, comments }: Review = req.body; // Use Review type

  try {
    await pool.execute('UPDATE Review SET reviewer_name = ?, rating = ?, comments = ? WHERE review_id = ?', [
      reviewer_name,
      rating,
      comments,
      id,
    ]);
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.execute('DELETE FROM Review WHERE review_id = ?', [id]);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
