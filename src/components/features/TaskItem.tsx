import React, { useState } from 'react';
import Checkbox from '../common/Checkbox';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onEdit?: (id: string, title: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleToggle = (checked: boolean) => {
    onToggle(task.id, checked);
  };

  const handleEditClick = () => {
    if (onEdit) {
      setIsEditing(true);
    }
  };

  const handleEditSave = () => {
    if (onEdit && editValue.trim() !== '') {
      onEdit(task.id, editValue);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditValue(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`task-item ${className}`}>
      <Checkbox
        checked={task.completed}
        onChange={handleToggle}
        size="xl"
      />
      
      <div className="flex-grow">
        {isEditing ? (
          <input
            type="text"
            className="w-full px-2 py-1 border-2 border-primary-300 rounded focus:outline-none focus:border-primary-500"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div
            className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}
            onClick={handleEditClick}
          >
            {task.title}
          </div>
        )}
      </div>
      
      {!isEditing && onDelete && (
        <button
          className="ml-2 text-gray-400 hover:text-red-500"
          onClick={handleDeleteClick}
          aria-label="タスクを削除"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default TaskItem;