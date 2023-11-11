
// import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import SearchIcon from './Search.svg'
//  const API_URL="https://www.omdbapi.com?apikey=c9818dae";
import MovieCard from './MovieCard';


const App = () => {
    const [movies, setmovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');
    const searchMovies = async (title) => {
        try {
            const response = await axios.get(`https://www.omdbapi.com?apikey=c9818dae&s=${title}`);
            const data = response.data;
            setmovies(data.Search);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        searchMovies('spiderman');
    }, []);
    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) =>  setsearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>



            {
                movies?.length > 0
                    ? (<div className='container'>
                        {movies.map((movie) => (
                            < MovieCard movie={movie}/>
                        ))}
                    </div>
                    ) : (
                        <div className='empty'>
                            <h2> No Movies Found </h2>
                        </div>
                    )
            }
        </div>
    );
}
export default App 