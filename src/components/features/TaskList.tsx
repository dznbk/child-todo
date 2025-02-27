import React from 'react';
import TaskItem, { Task } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onEdit?: (id: string, title: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  className = '',
}) => {
  // 完了タスク数の計算
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 進捗バー */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">達成度</span>
          <span className="text-sm font-medium">{completedCount} / {totalCount}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-success-500 h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* タスクリスト */}
      {tasks.length > 0 ? (
        <div>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              className="mb-3"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          タスクがありません。新しいタスクを追加してください。
        </div>
      )}
    </div>
  );
};

export default TaskList;