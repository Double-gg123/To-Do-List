import { useState } from 'react'
import Login from './Login'
import Signup from './Signup' 
import TodoList from './Todolist' // Ensure the filename casing matches your file
import './App.css'

function App() {
  // Initialize token from localStorage to keep user logged in on refresh
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isLogin, setIsLogin] = useState(true)

  // If token exists, show ONLY the TodoList
  // The logout button is now handled inside TodoList.jsx
  if (token) {
    return (
      <div className="App">
        <TodoList token={token} />
      </div>
    )
  }

  // If no token, show Login or Signup screens
  return (
    <div className="App">
      {isLogin ? (
        <Login setToken={setToken} />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  )
}

export default App