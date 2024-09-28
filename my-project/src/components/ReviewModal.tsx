import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (movieId: number, name: string, rating: number, comments: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onAddReview }) => {
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comments, setComments] = useState('');
  const { movies } = useSelector((state: any) => state.movies);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMovie !== null && comments && rating) {
      onAddReview(selectedMovie, name, rating, comments);
      onClose();
      // Reset form fields
      setSelectedMovie(null);
      setName('');
      setRating(null);
      setComments('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <h2 className="text-lg font-bold mb-4">Add New Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Movie:</label>
            <select
              value={selectedMovie !== null ? selectedMovie : ''}
              onChange={(e) => {
                const movieId = Number(e.target.value);
                setSelectedMovie(movieId);
                console.log(`Selected Movie ID: ${movieId}`); // Debugging statement
              }}
              className="border border-gray-300 rounded p-2 w-full text-black"
              required
            >
              <option value="">Select a movie</option>
              {movies.map((movie: any) => (
                <option key={movie.id} value={movie.id}>
                  {movie.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Reviewer Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating (1-10):</label>
            <input
              type="number"
              min="1"
              max="10"
              value={rating !== null ? rating : ''}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border border-gray-300 rounded p-2 w-full text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Review Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full text-black"
              rows={4}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
