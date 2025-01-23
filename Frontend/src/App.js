import React, { useEffect ,useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/home'
import Login from './pages/login';
import Profile from './pages/profile.jsx'
import Chat from './pages/chat.jsx'
import Contador from './component/prueba'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
  
    useEffect(() => {
      const isLogin = localStorage.getItem('isLoggedIn');
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken')
      if (isLogin === 'true') {
        setIsLoggedIn(true);
        setUserId(id || '');
        setToken(token || '')
      }
    }, []);
  
    const handleLoginSuccess = (id,token) => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId',id)
      localStorage.setItem('authToken',token)
      setIsLoggedIn(true);
      setUserId(id);
      setToken(token);
    };
  
    const handleLogout = () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      setUserId('');
      setToken('')
  };
  
    return (
      <div className="BrowserRoutes">
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLoginSuccess} />} 
        />
        <Route 
          path="/home" 
          element={isLoggedIn ? <Home isLoggedIn={isLoggedIn} onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route 
          path="/contador" 
          element={isLoggedIn ? <Contador /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
    );
  };
  
  export default App;

