import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const activeClass = ({ isActive }) =>
    isActive
      ? "text-gray-300 border-b-2 border-gray-300"
      : "text-white hover:text-gray-200"

  return (
    <nav className="glass p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold">
          Pokemon App
        </NavLink>
        <div className="space-x-4">
          <NavLink to="/" className={activeClass}>
            Dashboard
          </NavLink>
          <NavLink to="/pokemon" end={false} className={activeClass}>
            Pokemon
          </NavLink>
        </div>
      </div>
    </nav>
  )
};