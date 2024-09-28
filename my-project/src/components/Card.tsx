// src/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  key: number,
  releasedDate: string,
  rating: number,
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ key,title,releasedDate,rating, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 m-4 bg-white flex flex-col justify-between h-48">
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p>Released: {releasedDate}</p>
        <p>Rating: {rating? rating + "/10" : 'No rating is done'}</p>
      </div>
      <div className="flex justify-end">
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-700 mr-2">
          ✏️
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Card;
