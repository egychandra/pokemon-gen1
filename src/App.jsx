import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPokemonPage from './pages/Pokemon';
import DetailPokemonPage from './pages/Pokemon/Detail';
import DashboardPage from './pages/Dashboard';
import Navbar from './components/layouts/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-400">
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pokemon" element={<ListPokemonPage />} />
          <Route path="/pokemon/detail/:id" element={<DetailPokemonPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;