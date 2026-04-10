import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.nav
      className="navbar glass"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-brand">
        <span>📋</span>
        <span>TaskMaster</span>
      </div>

      <div className="navbar-user">
        <span className="navbar-user-name">
          👤 {user?.name}
        </span>
        
        <button
          className="btn btn-secondary btn-icon"
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button className="btn btn-danger btn-small" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
