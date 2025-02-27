import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppLayout from '../components/layout/AppLayout';
import TaskList from '../components/features/TaskList';
import TaskForm from '../components/features/TaskForm';
import { Task } from '../components/features/TaskItem';

type TaskPageProps = {
  userName: string;
  onSignOut?: () => void;
};

const TaskPage: React.FC<TaskPageProps> = ({ userName, onSignOut }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // タスクの追加
  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
    };
    
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // タスクの完了状態の切り替え
  const handleToggleTask = (id: string, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
    );
  };

  // タスクの編集
  const handleEditTask = (id: string, title: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title } : task
      )
    );
  };

  // タスクの削除
  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // ヘッダーコンポーネント
  const Header = (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary-600">
        {userName}のタスク
      </h1>
      {onSignOut && (
        <button
          onClick={onSignOut}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          設定をリセット
        </button>
      )}
    </div>
  );

  return (
    <AppLayout header={Header}>
      <div className="max-w-2xl mx-auto">
        <TaskForm onAddTask={handleAddTask} className="mb-8" />
        
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </AppLayout>
  );
};

export default TaskPage;