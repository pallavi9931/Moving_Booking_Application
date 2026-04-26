import { Routes, Route } from 'react-router-dom';
import Navbar from './presentation/components/Navbar';
import ProtectedRoute from './presentation/components/ProtectedRoute';
import Home from './presentation/pages/Home';
import Login from './presentation/pages/Login';
import Register from './presentation/pages/Register';
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
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/movies/:movieId"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shows/:showId/seats"
            element={
              <ProtectedRoute>
                <SeatLayout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
