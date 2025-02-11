import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { totalMovies } from '../data/movieData';
import ActorCard from '../components/ActorCard';
import { FaStar } from 'react-icons/fa';

const MovieInfo: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || '1');

  // Find the movie by ID
  const movie = totalMovies.find((movie) => movie.id === movieId);

  if (!movie) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The movie you're looking for doesn't exist in our database.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={movie.image}
              alt={movie.title}
              className={`w-full rounded-lg shadow-lg ${isDarkMode ? 'shadow-gray-800' : 'shadow-gray-300'}`}
            />
          </div>

          {/* Movie Information */}
          <div className="w-full md:w-2/3">
            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {movie.title} ({movie.year})
            </h1>

            <div className="flex items-center flex-wrap mb-6">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-md font-bold flex items-center">
              <FaStar className="text-black inline ml-0 mr-1" />{movie.rating}
              </span>
              <span className={`mx-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>|</span>
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{movie.duration}</span>
              <span className={`mx-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>|</span>
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{movie.genre.join(', ')}</span>
            </div>

            <div className="mb-8">
              <button className="bg-yellow-500 text-white rounded px-4 py-2" onClick={() => window.open(movie.trailerLink, '_blank')}>Watch Trailer</button>
              <button className="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300">Add to Watchlist</button>
              <h2 className={`text-2xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Synopsis</h2>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{movie.synopsis}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Director</h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{movie.director}</p>
              </div>

              <div className="col-span-2">
                <h2 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Additional Information</h2>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Release Date:</span> {movie.releaseDate}</p>
                    <p><span className="font-semibold">Language:</span> {movie.language}</p>
                  </div>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Budget:</span> {movie.budget}</p>
                    <p><span className="font-semibold">Box Office:</span> {movie.boxOffice}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-left mb-4">Cast</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-2">
                  {movie.cast.map((actor: { id: number; name: string; image: string; }) => (
                    <ActorCard
                          id={actor.id}
                          name={actor.name}
                          image={actor.image}                  />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
