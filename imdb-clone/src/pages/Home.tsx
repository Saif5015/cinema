import React from 'react';
import MovieList from '../components/MovieList';
import MovieCarousel from '../components/MovieCarousel';  // Make sure to import this
import { useNavigate } from 'react-router-dom';

// Movie Interface
interface Movie {
    id: number;
    title: string;
    year: number;
    rating: number;
    image: string;
}

// Movie data
const popularMovies: Movie[] = [
    { id: 1, title: 'Inception', year: 2010, rating: 8.8, image: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
    { id: 2, title: 'Interstellar', year: 2014, rating: 8.6, image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
    { id: 3, title: 'Avengers: Endgame', year: 2019, rating: 8.4, image: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
    { id: 4, title: 'Parasite', year: 2019, rating: 8.5, image: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
    { id: 5, title: 'Spider-Man: Across the Spider-Verse', year: 2023, rating: 8.7, image: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg' },
    { id: 16, title: 'Oppenheimer', year: 2023, rating: 8.9, image: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
    { id: 17, title: 'The Batman', year: 2022, rating: 8.0, image: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg' },
    { id: 18, title: 'Top Gun: Maverick', year: 2022, rating: 8.3, image: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg' },
];

const topRatedMovies: Movie[] = [
    { id: 6, title: 'The Shawshank Redemption', year: 1994, rating: 9.3, image: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
    { id: 7, title: 'The Godfather', year: 1972, rating: 9.2, image: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
    { id: 8, title: 'The Dark Knight', year: 2008, rating: 9.0, image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
    { id: 9, title: 'Pulp Fiction', year: 1994, rating: 8.9, image: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg' },
    { id: 10, title: 'Forrest Gump', year: 1994, rating: 8.8, image: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg' },
    { id: 19, title: 'Schindler\'s List', year: 1993, rating: 9.0, image: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHjvGI1TAYymCfbfl3vT.jpg' },
    { id: 20, title: '12 Angry Men', year: 1957, rating: 9.0, image: 'https://image.tmdb.org/t/p/w500/ppd84D2i9W8jXmsyInGyihiSyqz.jpg' },
    { id: 21, title: 'The Lord of the Rings: The Return of the King', year: 2003, rating: 9.0, image: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg' },
];

const upcomingMovies: Movie[] = [
    { id: 11, title: 'Dune: Part Two', year: 2024, rating: 8.5, image: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg' },
    { id: 12, title: 'Deadpool 3', year: 2024, rating: 8.2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEcPvRTxJ87rtOFufomi5lPaOHrqLuTALBCw&s' },
    { id: 13, title: 'Joker: Folie à Deux', year: 2024, rating: 8.3, image: 'https://image.tmdb.org/t/p/w500/bk7SJz9GQXDKXvgZAzJk9XgQB8R.jpg' },
    { id: 14, title: 'Furiosa', year: 2024, rating: 8.1, image: 'https://image.tmdb.org/t/p/w500/6mCXVXoVJxW4LHc9jYDwYFIHQCw.jpg' },
    { id: 15, title: 'Kingdom of the Planet of the Apes', year: 2024, rating: 7.9, image: 'https://image.tmdb.org/t/p/w500/8tGZbqePTre2AnpMeB7UyJUIpJx.jpg' },
    { id: 22, title: 'Ghostbusters: Frozen Empire', year: 2024, rating: 7.8, image: 'https://image.tmdb.org/t/p/w500/5iGvKJQym8gMHlBHJvNgDvlhBdt.jpg' },
    { id: 23, title: 'Inside Out 2', year: 2024, rating: 8.0, image: 'https://image.tmdb.org/t/p/w500/mPWV93QKQJ9CqyZHEeZfpHW3fxj.jpg' },
    { id: 24, title: 'Godzilla x Kong: The New Empire', year: 2024, rating: 7.9, image: 'https://image.tmdb.org/t/p/w500/bQ2ywkchIiaKLSEaMrcT6e29f91.jpg' },
];

const Home: React.FC = () => {
    const navigate = useNavigate();

    // Handle View All for each category
    const handleViewAllClick = (category: string) => {
        navigate(`/view-all/${category}`);  // Correct URL
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <MovieCarousel /> {/* Keep this here to display the carousel */}

            {/* Popular Movies Section */}
            <div className="relative mb-8">
                <button
                    onClick={() => handleViewAllClick('popular')}
                    className="absolute top-0 right-0 text-blue-500 hover:underline"
                >
                    View All
                </button>
                <MovieList title="Popular Movies" movies={popularMovies} />
            </div>

            {/* Top Rated Movies Section */}
            <div className="relative mb-8">
                <button
                    onClick={() => handleViewAllClick('top-rated')}
                    className="absolute top-0 right-0 text-blue-500 hover:underline"
                >
                    View All
                </button>
                <MovieList title="Top Rated Movies" movies={topRatedMovies} />
            </div>

            {/* Upcoming Movies Section */}
            <div className="relative mb-8">
                <button
                    onClick={() => handleViewAllClick('upcoming')}
                    className="absolute top-0 right-0 text-blue-500 hover:underline"
                >
                    View All
                </button>
                <MovieList title="Upcoming Movies" movies={upcomingMovies} />
            </div>
        </div>
    );
};

export default Home;
