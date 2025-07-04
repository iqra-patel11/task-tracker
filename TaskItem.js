import React, { useState } from 'react';
import '../styles/TaskItem.css';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDesc, setEditedDesc] = useState(task.description);
  const [showConfirm, setShowConfirm] = useState(false); // For custom prompt

  const handleSave = () => {
    onEdit(task.id, editedTitle, editedDesc);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
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
          <button onClick={handleSave}>💾 Save</button>
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p className="created-at">🕓 {new Date(task.createdAt).toLocaleString()}</p>
          <div className="task-actions">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button onClick={() => setShowConfirm(true)}>🗑️ Delete</button>
          </div>
        </>
      )}

      {showConfirm && (
        <div className="delete-confirm-popup">
          <p>Are you sure you want to delete this task? 🥺</p>
          <div className="confirm-buttons">
            <button className="yes" onClick={() => onDelete(task.id)}>Yes</button>
            <button className="no" onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
