import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface Movie {
    id: number;
    title: string;
    year: number;
    rating: number;
    image: string;
}

interface MovieListProps {
    title: string;
    movies: Movie[];
    isScrollable?: boolean;  // New optional prop to determine the layout type
}

const MovieList: React.FC<MovieListProps> = ({ title, movies, isScrollable = true }) => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleMovieClick = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = container.clientWidth * 0.8;
            const newScrollLeft = direction === 'left' 
                ? container.scrollLeft - scrollAmount 
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    if (isScrollable) {
        // This is the horizontal scroll layout (with left and right buttons)
        return (
            <div className="mb-8">
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {title}
                </h2>
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Movie List */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {movies.map((movie) => (
                            <div key={movie.id} className="flex-none w-[312.5px]">
                                <div
                                    className={`cursor-pointer transition-all duration-300 
                                        transform hover:scale-105 rounded-lg overflow-hidden 
                                        shadow-lg hover:shadow-2xl
                                        ${isDarkMode ? 'bg-gray-900 shadow-black/50' : 'bg-white shadow-gray-200'}`}
                                    onClick={() => handleMovieClick(movie.id)}
                                >
                                    <div className="relative">
                                        <img
                                            src={movie.image}
                                            alt={movie.title}
                                            className="w-full h-[468.75px] object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center font-bold">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                {movie.rating}
                                            </div>
                                        </div>
                                        <div className={`absolute bottom-0 left-0 right-0 p-4 
                                            bg-gradient-to-t from-black to-transparent`}>
                                            <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 hover:text-blue-400 transition-colors">
                                                {movie.title}
                                            </h3>
                                            <p className="text-gray-300 font-medium">{movie.year}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    // If not scrollable, show the grid layout
    return (
        <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="flex-none w-full">
                        <div
                            className={`cursor-pointer transition-all duration-300 
                                transform hover:scale-105 rounded-lg overflow-hidden 
                                shadow-lg hover:shadow-2xl
                                ${isDarkMode ? 'bg-gray-900 shadow-black/50' : 'bg-white shadow-gray-200'}`}
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <div className="relative">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="w-full h-[468.75px] object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                    <div className="bg-yellow-400 text-black px-2 py-1 rounded-md flex items-center font-bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        {movie.rating}
                                    </div>
                                </div>
                                <div className={`absolute bottom-0 left-0 right-0 p-4 
                                    bg-gradient-to-t from-black to-transparent`}>
                                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 hover:text-blue-400 transition-colors">
                                        {movie.title}
                                    </h3>
                                    <p className="text-gray-300 font-medium">{movie.year}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
