import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// e2321ca6 API key

const API_URL = 'http://www.omdbapi.com?apikey=e2321ca6';

const App = () => {
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setMovies(data.Search);
  }

  useEffect(() => {
           searchMovies('Spiderman');
  }, []);

  return (
    <div className="app">
      <h1>Filmorama</h1>

      <div className="search">
        <input 
          placeholder="Rechercher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} 
          alt="rechercher"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ): (
          <div className="empty">
            <h2>Aucun film trouvé</h2>
          </div>
        )}
    </div>
  );
}

export default App;
