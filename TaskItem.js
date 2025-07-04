import React, { useState } from 'react';
import '../styles/TaskItem.css';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);

  const handleSave = () => {
    onEdit(task.id, editedTitle, editedDesc);
    setIsEditing(false);
  };

  return (
    <div className={`task-item animated-border ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
          />
          <textarea
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
            className="edit-textarea"
          />
          <button onClick={handleSave} className="save-button">💾 Save</button>
        </div>
      ) : (
        <>
          <h3 className="task-title">{task.title}</h3>
          <p className="task-desc">{task.description}</p>
          <p className="created-at">🕓 {new Date(task.createdAt).toLocaleString()}</p>

          <div className="task-actions">
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
              />
              {task.completed ? ' ✅ Done' : ' ⏳ Pending'}
            </label>
            <button onClick={() => setIsEditing(true)} className="edit-button">✏️ Edit</button>
            <button onClick={() => onDelete(task.id)} className="delete-button">🗑️ Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
