import React, { useState } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Menu from './components/Menu';
import './styles/App.css';

const App = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleEditTask = (id, newTitle, newDesc) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle, description: newDesc } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchStatus =
      filter === 'completed'
        ? task.completed
        : filter === 'pending'
        ? !task.completed
        : true;
    const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="planner-box">
          <header className="header-container">
            <div className="header-left">
              <h1>{username}'s Task Tracker</h1>
            </div>
            <div className="header-right">
              <Menu
                onLogout={() => {
                  localStorage.removeItem('username');
                  setUsername('');
                }}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode(!darkMode)}
              />
            </div>
          </header>

          <div className="main-content-wrapper">
            <div className="top-controls">
              <input
                type="text"
                placeholder="🔍 Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
              <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('pending')}>Pending</button>
              </div>
            </div>

            <main>
              <TaskForm onAdd={handleAddTask} darkMode={darkMode} />
              <section>
                <TaskList
                  tasks={filteredTasks}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              </section>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
