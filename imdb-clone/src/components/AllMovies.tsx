import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

const AllMovies = () => {
    const { isDarkMode } = useTheme();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    const [viewMode, setViewMode] = useState<string>("grid");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<string>("all");
    const [selectedRating, setSelectedRating] = useState<string>("all");
    const [userRating, setUserRating] = useState<{ [key: number]: number }>({});

    const API_KEY = "89e89989982ba3305c463d55bab4d89f";
    const BASE_URL = "https://api.themoviedb.org/3";

    const genreMap: { [key: number]: string } = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        10751: "Family",
        14: "Fantasy",
        27: "Horror",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        53: "Thriller",
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const params: any = {
                    api_key: API_KEY,
                    language: 'en-US',
                    sort_by: 'popularity.desc',
                };

                if (search) {
                    params.query = search;
                } else {
                    if (selectedGenre) params.with_genres = selectedGenre;
                    if (selectedYear !== "all") params.primary_release_year = selectedYear;
                    if (selectedRating !== "all") params['vote_average.gte'] = selectedRating;
                }

                const endpoint = search ? '/search/movie' : '/discover/movie';
                const response = await axios.get<{ results: Movie[] }>(`${BASE_URL}${endpoint}`, { params });
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [search, selectedGenre, selectedYear, selectedRating]);

    const handleRating = (movieId: number, rating: number) => {
        setUserRating((prevRatings) => ({
            ...prevRatings,
            [movieId]: rating,
        }));
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} container mx-auto p-4`}>
            <h1 className="text-3xl font-bold mb-8">
                {search ? `Search Results for "${search}"` : "Popular Movies"}
            </h1>

            {/* Filter Section */}
            <div className={`flex gap-4 mb-8 p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <select
                    value={selectedGenre || "all"}
                    onChange={(e) => setSelectedGenre(Number(e.target.value) || null)}
                    className={`border px-4 py-2 rounded ${isDarkMode ? "border-gray-500 text-white bg-gray-800" : "border-gray-300 text-black bg-white"}`}
                >
                    <option value="all">All Genres</option>
                    {Object.entries(genreMap).map(([id, genre]) => (
                        <option key={id} value={id}>{genre}</option>
                    ))}
                </select>

                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className={`border px-4 py-2 rounded ${isDarkMode ? "border-gray-500 text-white bg-gray-800" : "border-gray-300 text-black bg-white"}`}
                >
                    <option value="all">All Years</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className={`border px-4 py-2 rounded ${isDarkMode ? "border-gray-500 text-white bg-gray-800" : "border-gray-300 text-black bg-white"}`}
                >
                    <option value="all">All Ratings</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                        <option key={rating} value={rating}>{rating} ★</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                    className={`gap-4 ${isDarkMode ? "text-white" : "text-black"}`}
                >
                    {viewMode === "grid" ? "Switch to List View" : "Switch to Grid View"}
                </button>
            </div>

            <div className={viewMode === "grid" ? "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-6"}>
                {loading ? (
                    <div className="text-center col-span-full">Loading...</div>
                ) : movies.length === 0 ? (
                    <div className="text-center col-span-full">No movies found</div>
                ) : movies.map((movie) => (
                    viewMode === "grid" ? (
                        <div 
                            key={movie.id} 
                            className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg h-[500px]`}
                        >
                            <Link to={`/movie/${movie.id}`} className="relative h-[75%]">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-md flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-yellow-500 font-medium">
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h2>
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`w-4 h-4 ${userRating[movie.id] && index < userRating[movie.id] ? "text-yellow-500 fill-current" : "text-gray-400 fill-current"} cursor-pointer`}
                                            onClick={() => handleRating(movie.id, index + 1)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={movie.id} className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg p-4 flex gap-4`}>
                            <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-32 h-48 object-cover rounded-lg"
                                />
                            </Link>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="text-yellow-500">
                                            {movie.vote_average.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                                <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    {movie.overview}
                                </p>
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`w-4 h-4 ${userRating[movie.id] && index < userRating[movie.id] ? "text-yellow-500 fill-current" : "text-gray-400 fill-current"} cursor-pointer`}
                                            onClick={() => handleRating(movie.id, index + 1)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default AllMovies;