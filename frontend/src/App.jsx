import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Success from './pages/Success';
import AdminLogin from './pages/AdminLogin'; // Импортируем страницу логина

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Страница входа в админку */}
        <Route path="/admin" element={<AdminLogin />} /> 
        
        {/* Защищенная панель управления */}
        <Route path="/admin/dashboard" element={<Admin />} /> 
        
        <Route path="/reservation/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
