import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import axios from 'axios';
import ReactDOM from 'react-dom';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/check-auth');
        if (response.data.authenticated) {
          setAuthenticated(true);
          const profileResponse = await axios.get('/profile');
          setUser(profileResponse.data.user);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    console.log('User data on login:', userData);

    setUser(userData);
    setAuthenticated(true);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={authenticated ? <Profile user={user} /> : <Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={authenticated ? <Profile user={user} /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
