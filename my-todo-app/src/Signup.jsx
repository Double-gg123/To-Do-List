import React, { useState } from 'react';

const Signup = ({ setIsLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // REPLACE with your Xano Signup URL
    const SIGNUP_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:fCLrVXom/auth/signup';

    try {
      const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Now you can login with these credentials.");
        setIsLogin(true); // Switch back to login form
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <h2>Create Account</h2>
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <input 
                type="text" placeholder="Full Name" 
                value={name} onChange={(e) => setName(e.target.value)} required 
              />
            </div>
            <div className="input-group">
              <input 
                type="email" placeholder="Email" 
                value={email} onChange={(e) => setEmail(e.target.value)} required 
              />
            </div>
            <div className="input-group">
              <input 
                type="password" placeholder="Password" 
                value={password} onChange={(e) => setPassword(e.target.value)} required 
              />
            </div>
            <button type="submit" className="login-btn">Register to Xano</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;