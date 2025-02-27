import React from 'react';
import { useAtom } from 'jotai';
import AppLayout from '../components/layout/AppLayout';
import TaskList from '../components/features/TaskList';
import TaskForm from '../components/features/TaskForm';
import Button from '../components/common/Button';
import {
  persistTasksAtom,
  addTask,
  toggleTask,
  editTask,
  deleteTask,
  resetTasksStatus,
  getLastResetDate
} from '../store/taskStore';
import { formatDate } from '../utils/dateUtils';

type TaskPageProps = {
  userName: string;
  onSignOut?: () => void;
};

const TaskPage: React.FC<TaskPageProps> = ({ userName, onSignOut }) => {
  const [tasks, setTasks] = useAtom(persistTasksAtom);

  // タスクをリセット
  const handleResetTasks = () => {
    setTasks(resetTasksStatus(tasks));
  };

  // タスクの追加
  const handleAddTask = (title: string) => {
    setTasks(addTask(tasks, title));
  };

  // タスクの完了状態の切り替え
  const handleToggleTask = (id: string, completed: boolean) => {
    setTasks(toggleTask(tasks, id, completed));
  };

  // タスクの編集
  const handleEditTask = (id: string, title: string) => {
    setTasks(editTask(tasks, id, title));
  };

  // タスクの削除
  const handleDeleteTask = (id: string) => {
    setTasks(deleteTask(tasks, id));
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">
              最終リセット: {formatDate(getLastResetDate())}
            </p>
          </div>
          <Button
            onClick={handleResetTasks}
            size="sm"
            variant="secondary"
          >
            タスクをリセット
          </Button>
        </div>

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