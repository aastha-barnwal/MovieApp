import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMovie: (name: string, releaseDate: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAddMovie }) => {
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !releaseDate) {
      alert('Please provide both name and release date.');
      return;
    }

    onAddMovie(name, releaseDate); // Pass the state values to the parent
    onClose(); // Close the modal after adding the movie
    setName(''); // Reset input fields
    setReleaseDate('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <h2 className="text-lg font-bold mb-4">Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Movie Name"
              className="border border-gray-300 rounded p-2 w-full text-black"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full text-black"
              placeholder="Release Date (YYYY-MM-DD)"
              required
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
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
