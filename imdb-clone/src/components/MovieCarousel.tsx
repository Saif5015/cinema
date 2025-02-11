import React, { useState, useEffect } from 'react';
import { FaStar, FaPlay } from 'react-icons/fa'; // Import Font Awesome star and play icons
import { totalMovies } from '../data/movieData'; // Import your movie data
import { Link } from 'react-router-dom'; // Import Link from React Router

const MovieCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Get only the first 6 movies for the carousel
    const carouselMovies = totalMovies.slice(0, 6);

    // Next movie function to loop to the next movie
    const nextMovie = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselMovies.length); // Loop to the first movie if reaching the end
    };

    // Previous movie function to loop to the previous movie
    const prevMovie = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselMovies.length) % carouselMovies.length); // Loop to the last movie if going backward
    };

    useEffect(() => {
        const interval = setInterval(nextMovie, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval); // Clear interval when the component is unmounted
    }, []);

    return (
        <div className="relative w-full h-[70vh] overflow-hidden rounded-lg mb-8">
            {/* Previous Button */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all z-50"
                onClick={prevMovie}
            >
                &#10094; {/* Left arrow */}
            </button>

            {/* Next Button */}
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all z-50"
                onClick={nextMovie}
            >
                &#10095; {/* Right arrow */}
            </button>

            {/* Image */}
            <div className="relative w-full h-full">
                <img
                    src={carouselMovies[currentIndex].image}
                    alt={carouselMovies[currentIndex].title}
                    className="w-full h-full object-cover transition-transform duration-700"
                />
                {/* Overlay and Title */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
                    <div className="text-center text-white px-4">
                        <p className="text-4xl font-extrabold drop-shadow-lg">{carouselMovies[currentIndex].title}</p>
                        {/* Year and Rating in same line with '|' and more space */}
                        <p className="text-xl mt-2 flex justify-center items-center space-x-2">
                            <span>{carouselMovies[currentIndex].year}</span>
                            <span className="mx-2">|</span> {/* Added margin on both sides of the pipe */}
                            <span className="flex items-center">
                                <FaStar className="text-yellow-400 mr-1" /> 
                                {carouselMovies[currentIndex].rating}
                            </span>
                        </p>
                        <p className="mt-2 text-lg">{carouselMovies[currentIndex].synopsis}</p>
                        
                        {/* Buttons: Play Button and Info */}
                        <div className="mt-4 flex justify-center space-x-4 w-full max-w-[300px] mx-auto">
                            {/* Play Button with a black play symbol before "Trailer" */}
                            <a
                                href={carouselMovies[currentIndex].trailerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-yellow-600 text-black p-2 rounded-lg shadow-lg hover:bg-yellow-700 w-full text-center justify-center items-center"
                            >
                                <FaPlay className="text-2xl mr-2" /> {/* Play icon */}
                                Trailer
                            </a>
                            
                            {/* Info Button with Link for Navigation */}
                            <Link
                                to={`/movie/${carouselMovies[currentIndex].id}`} // Dynamic link based on movie id
                                className="inline-block bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 w-full text-center"
                            >
                                Info
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
                {carouselMovies.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full bg-white cursor-pointer ${
                            currentIndex === index ? 'bg-opacity-80' : 'bg-opacity-50'
                        } transition-all`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default MovieCarousel;
