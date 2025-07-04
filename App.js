import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import './styles/App.css';  // ✅ styles folder

function App() {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedTasks = localStorage.getItem('tasks');

    if (storedUsername) setUsername(storedUsername);
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  const handleAddTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="App">
      {username ? (
        <>
          <h1>Welcome, {username}!</h1>
          <TaskForm onAddTask={handleAddTask} />
        </>
      ) : (
        <Login onLogin={setUsername} />
      )}
    </div>
  );
}

export default App;
