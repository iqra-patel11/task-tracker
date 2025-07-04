import React from 'react';
import '../styles/App.css';

const TaskList = ({ tasks, onDelete, onToggleComplete }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''}`}
        >
          <div className="task-header">
            <h3>{task.title}</h3>
            <span>{new Date(task.createdAt).toLocaleString()}</span>
          </div>
          {task.description && <p>{task.description}</p>}
          <div className="task-actions">
            <button onClick={() => onToggleComplete(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
