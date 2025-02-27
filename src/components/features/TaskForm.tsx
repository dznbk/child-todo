import React, { useState } from 'react';
import Button from '../common/Button';

type TaskFormProps = {
  onAddTask: (title: string) => void;
  className?: string;
};

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, className = '' }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() !== '') {
      onAddTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-grow px-4 py-3 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-primary-500"
        />
        <Button
          type="submit"
          disabled={title.trim() === ''}
          size="lg"
        >
          追加
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;