import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:37ZDEinG/to_do_table';

  useEffect(() => {
    if (token) {
      fetch(API_URL, { 
        headers: { 'Authorization': `Bearer ${token}` } 
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setTodos(data);
          }
        })
        .catch(err => console.error("Error fetching todos:", err));
    }
  }, [token]);

  // NEW: Toggle completion status in Xano
  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ is_completed: !currentStatus })
      });

      if (response.ok) {
        const updatedTask = await response.json();
        // Update the local list to show the change immediately
        setTodos(todos.map(t => t.id === id ? updatedTask : t));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ task_name: newTask, is_completed: false })
      });

      const result = await response.json();
      
      if (response.ok) {
        setTodos([result, ...todos]);
        setNewTask('');
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.reload(); 
  };

  return (
    <div className="todo-wrapper">
      <div className="todo-card">
        <header className="todo-header">
          <h2>Daily Timeline</h2>
          <p>Organize your day, one task at a time.</p>
        </header>

        <form onSubmit={addTask} className="pretty-input-group">
          <input 
            type="text" 
            placeholder="What's your next goal?" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          />
          <button type="submit" className="pretty-add-btn">Add Task</button>
        </form>

        <div className="timeline-container">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div className="timeline-block" key={todo.id}>
                <div className="timeline-marker">
                  {/* Dot changes color if completed */}
                  <div className={`marker-dot ${todo.is_completed ? 'completed-dot' : ''}`}></div>
                  {index !== todos.length - 1 && <div className="marker-line"></div>}
                </div>
                <div className="timeline-content-card">
                  {/* Clicking the text triggers the strike-through */}
                  <span 
                    className={`task-name ${todo.is_completed ? 'completed-text' : ''}`}
                    onClick={() => toggleComplete(todo.id, todo.is_completed)}
                  >
                    {todo.task_name}
                  </span>
                  <button className="pretty-delete-btn" onClick={() => deleteTask(todo.id)}>
                    ✕
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-msg">No tasks yet. Add your first goal!</p>
          )}
        </div>

        <div className="logout-section">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;