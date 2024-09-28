import React from 'react';


const Search: React.FC = () => {
  return (
    <div className="text-left mt-10 ml-10">
      <h1 className="text-2xl font-large">The best movie review site!!</h1>
      <input
        type="text"
        placeholder="Search..."
        className="mt-4 p-2 border border-purple-300 rounded w-full max-w-md"
      />
    </div>
  )
}
export default Search;
