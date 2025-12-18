import React, { useState } from 'react';
import './Login.css';
import googleLogo from "./assets/google-logo-icon.png";
import fbLogo from "./assets/facebook-icon.png";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // REPLACE with your actual Xano Base URL
    const XANO_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:fCLrVXom/auth/login';

    try {
      const response = await fetch(XANO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.authToken) {
        localStorage.setItem('token', data.authToken);
        setToken(data.authToken);
        alert('Login Successful!');
      } else {
        alert('Login failed: ' + (data.message || 'Invalid credentials'));
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Left Side: Form */}
        <div className="login-left">
          <h2>Sign In</h2>
          <p>Please enter your credentials to access your to-do list.</p>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <span className="icon">👤</span>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="input-group">
              <span className="icon">🔒</span>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <div className="social-divider">
            <span>or login with</span>
          </div>

         <div className="social-icons">
  <button className="social-btn">
    <img src={fbLogo} alt="Facebook" className="btn-icon" />
  </button>
  <button className="social-btn">
    <img src={googleLogo} alt="Google" className="btn-icon" />
  </button>
</div>
        </div>

        {/* Right Side: Illustration (Matches your image) */}
        <div className="login-right">
          <div className="illustration-wrapper">
             {/* You can replace this with your actual image file */}
             <img src="data:image/jpeg;base64,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" alt="Login Graphic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;