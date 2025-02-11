import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { totalMovies } from '../data/movieData';  // Import the movie data file
import { Actor } from '../data/movieData';
import { FaInstagram, FaTwitter, FaStar, FaTrophy } from 'react-icons/fa'; // Import the necessary icons
import { useTheme } from '../contexts/ThemeContext';  // Import the global theme context

const ActorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get actorId from URL
  const [actor, setActor] = useState<Actor | null>(null);
  const { isDarkMode } = useTheme();  // Use the global theme context

  useEffect(() => {
    if (id) {
      // Safely parse the actor ID to a number
      const actorId = parseInt(id);

      if (!isNaN(actorId)) {
        // Find the actor from all movies cast
        const foundActor = totalMovies
          .flatMap(movie => movie.cast)  // Flatten the cast array from all movies
          .find(actor => actor.id === actorId);  // Find the actor by id

        if (foundActor) {
          setActor(foundActor);  // Set the found actor's data to the state
        }
      }
    }
  }, [id]);

  if (!actor) {
    return <div>Actor not found!</div>;  // Display if no actor found
  }

  return (
    <div className={isDarkMode ? 'bg-black text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <div className="actor-details p-4">
        {/* Personal Info Section */}
        <div className={isDarkMode ? 'personal-info relative flex gap-16 p-4 bg-black border-4 border-gray-400 rounded-lg shadow-md' : 'personal-info relative flex gap-16 p-4 bg-white border-4 border-gray-400 rounded-lg shadow-md'}>
          <img src={actor.image} alt={actor.name} className="w-80 h-80 rounded-lg object-cover" />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2">{actor.name}</h1>
            <p><strong>Date of Birth:</strong> {actor.dateOfBirth}</p>
            <p><strong>Height:</strong> {actor.height}</p>
            <p><strong>Place of Birth:</strong> {actor.placeOfBirth}</p>
            <p><strong>Nationality:</strong> {actor.nationality}</p>
            <div className="absolute bottom-6 right-20 flex gap-8">
              <a href={actor.instagram} target="_blank" rel="noopener noreferrer" className="text-4xl hover:text-pink-500 transition duration-300">
                <FaInstagram />
              </a>
              <a href={actor.twitter} target="_blank" rel="noopener noreferrer" className="text-4xl hover:text-blue-500 transition duration-300">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className={isDarkMode ? 'bio mt-6 bg-black border-4 border-gray-400 p-4 rounded-lg' : 'bio mt-6 bg-white border-4 border-gray-400 p-4 rounded-lg'}>
          <h2 className="text-2xl font-semibold mb-2">Bio</h2>
          <p>{actor.bio}</p>
        </div>

        {/* Career Section */}
        <div className={isDarkMode ? 'career mt-6 bg-black border-4 border-gray-400 p-4 rounded-lg' : 'career mt-6 bg-white border-4 border-gray-400 p-4 rounded-lg'}>
          <h2 className="text-2xl font-semibold mb-2">Career</h2>
          <p className="flex items-center"><strong>Average Rating:</strong> <FaStar className="text-yellow-400 inline ml-2 mr-1" />{actor.avgRating}</p>
          <p><strong>Famous Role:</strong> {actor.famousRole}</p>
          <p><strong>Total Movies:</strong> {actor.totalMovies}</p>
          <p><strong>Upcoming Project:</strong> {actor.upcomingProject}</p>
        </div>

        {/* Awards Section */}
        <div className={isDarkMode ? 'awards mt-6 bg-black border-4 border-gray-400 p-4 rounded-lg' : 'awards mt-6 bg-white border-4 border-gray-400 p-4 rounded-lg'}>
          <h2 className="text-2xl font-semibold mb-2">Awards</h2>
          <p className="flex items-center"><strong>Total Awards Won:</strong> <FaTrophy className="text-yellow-400 inline ml-2 mr-1" />{actor.totalAwardsWon}</p>
          <p><strong>Nominations:</strong> {actor.nominations.join(', ')}</p>
        </div>

        {/* Known For Section */}
        <div className={isDarkMode ? 'known-for mt-6 bg-black border-4 border-gray-400 p-4 rounded-lg' : 'known-for mt-6 bg-white border-4 border-gray-400 p-4 rounded-lg'}>
          <h2 className="text-2xl font-semibold mb-2">Known For</h2>
          <div className="known-for-movies flex gap-6">
            {actor.knownFor.map(movie => (
              <div key={movie.id} className="movie-card w-36 h-48 bg-gray-600 rounded-lg overflow-hidden shadow-md">
                <img src={movie.image} alt={movie.title} className="w-full h-36 object-cover" />
                <div className="movie-title p-2 text-center text-white">{movie.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trivia Section */}
        <div className={isDarkMode ? 'trivia mt-6 bg-black border-4 border-gray-400 p-6 rounded-lg' : 'trivia mt-6 bg-white border-4 border-gray-400 p-6 rounded-lg'}>
          <h2 className="text-2xl font-semibold mb-2">Trivia</h2>
          <ul className={isDarkMode ? 'list-disc pl-5 text-white' : 'list-disc pl-5 text-black'}>
            <li><strong>Favorite Movie:</strong> {actor.favoriteMovie}</li>
            <li><strong>Skills:</strong> {actor.skills.join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
