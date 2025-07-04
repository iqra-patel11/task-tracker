import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load saved username and tasks from localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (savedUsername) {
      setUsername(savedUsername);
    }

    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>🎀 Personal Task Tracker</h1>

      {username ? (
        <>
          <p>Welcome, {username}!</p>

          {/* Add Task Form */}
          <TaskForm onAddTask={handleAddTask} />

          {/* Task List with Search */}
          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
