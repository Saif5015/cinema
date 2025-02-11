import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllMovies from './components/AllMovies';
import MovieInfo from './pages/MovieInfo';
import ActorDetails from './pages/ActorDetails';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import MovieCarousel from './components/MovieCarousel';
const AppContent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<AllMovies />} />
            <Route path="/" element={<MovieCarousel />} />
            <Route path="/movie/:id" element={<MovieInfo />} />
            <Route path="/actor/:id" element={<ActorDetails />} />
            <Route path="/watchlist" element={<h2 className="text-center mt-10">Watchlist Coming Soon</h2>} />
            <Route path="/signin" element={<h2 className="text-center mt-10">Sign In Coming Soon</h2>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
