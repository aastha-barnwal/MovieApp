import express from 'express';
import { createReview, getReviewsByMovieId, deleteReview } from '../controllers/reviewController';

const router = express.Router();

router.post('/', createReview);
router.get('/:movie_id', getReviewsByMovieId);
router.delete('/:id', deleteReview);

export default router;
