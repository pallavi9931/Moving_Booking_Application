import { Routes, Route } from 'react-router-dom';
import Navbar from './presentation/components/Navbar';
import Home from './presentation/pages/Home';
import MovieDetails from './presentation/pages/MovieDetails';
import SeatLayout from './presentation/pages/SeatLayout';
import Checkout from './presentation/pages/Checkout';
import Dashboard from './presentation/pages/Dashboard';
import Profile from './presentation/pages/Profile';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/shows/:showId/seats" element={<SeatLayout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
