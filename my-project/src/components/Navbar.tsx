import React, { useState } from 'react';
import Modal from './Modal';
import ReviewModal from './ReviewModal'
const Navbar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const handleAddMovie = async (name: string, releaseDate: string) => {
      try {
        console.log(name,releaseDate);
        if (!name || !releaseDate) {
          alert('Please provide both a movie name and release date.');
          return;
        }
        // Make a POST request to save the movie in the database
        const response = await fetch('http://localhost:3000/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            releaseDate,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          // Movie saved successfully
          alert(`Movie created successfully`);
        } else {
          console.log(`${data}`);
          // Error handling
          alert(`Failed to create movie: ${data.message}`);
        }
      } catch (error) {
        // Catch and handle any network errors
        console.error('Error saving movie:', error);
        alert('An error occurred while saving the movie.');
      }
    };
      const handleAddReview = async(movieId: number, name: string, rating: number, comments: string) => {
        try {
          console.log(movieId,name,rating,comments);
          if (!rating && !comments) {
            alert('Please provide both a rating name and comments date.');
            return;
          }
          // Make a POST request to save the movie in the database
          const response = await fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              movieId,
              name,
              rating,
              comments
            }),
          });
          const data = await response.json();
          if (response.ok) {
            // Movie saved successfully
            alert(`Review created successfully`);
          } else {
            console.log(`${data}`);
            // Error handling
            alert(`Failed to create movie: ${data.message}`);
          }
        } catch (error) {
          // Catch and handle any network errors
          console.error('Error saving movie:', error);
          alert('An error occurred while saving the movie.');
        }
      };
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">MovieCritic</div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
         onClick={() => setIsModalOpen(true)}>
          Add new movie
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsReviewModalOpen(true)}
        >    
          Add new review
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMovie={handleAddMovie}
      />
       <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </nav>
  );
};

export default Navbar;
