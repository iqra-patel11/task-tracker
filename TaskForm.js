import React, { useState } from 'react';
import '../styles/App.css';

const TaskForm = ({ onAdd, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAdd(newTask); // ✅ using the correct prop function
    setTitle('');
    setDescription('');
  };

  return (
    <div className={`task-form-container ${darkMode ? 'dark' : ''}`}>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="📝 Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="task-input"
        />
        <textarea
          placeholder="📓 Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="task-textarea"
        />
        <button type="submit" className="task-button">
          ➕ Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
