import React, { useState,useEffect } from 'react';
import Card from './Card'
import { useDispatch,useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';
import { AppDispatch } from '../redux/store'; 
import EditMovieModal from './EditMovieModal';
const BodyHome: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { movies, loading, error } = useSelector((state: any) => state.movies); 
    const [editMovie, setEditMovie] = useState(false);
    const [deleteMovie, setDeleteMovie] = useState(false);
    const handleEditMovie=()=>{
      
    }
    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    useEffect(()=>{},[deleteMovie])
    const handleEdit = (id: number) => {
        setEditMovie(true);
      };
    
      const handleDelete = (id: number) => {

        setDeleteMovie(true);
      };
    return(
    <div className="text-left mt-10 ml-10">
        <h1 className="text-2xl font-bold">The best movie review site!!</h1>
        {loading && <p>Loading movies...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-wrap justify-center mt-8">
          {movies.map((movie: any) => (
            <Card key={movie.id} title={movie.name} releasedDate={movie.releaseDate} rating={movie.averageRating} onEdit={()=>{handleEdit(movie.id)}} onDelete={()=>{handleDelete(movie.id)}} />
          ))}
        </div>
        {editMovie?(<EditMovieModal isOpen={editMovie}
        onClose={() => setEditMovie(false)}
        onAddMovie={handleEditMovie} ></EditMovieModal>):null}
      </div>
    )
}
export default BodyHome;