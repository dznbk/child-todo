import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  resetTasksStatus,
  addTask,
  toggleTask,
  editTask,
  deleteTask
} from '../store/taskStore';
import { Task } from '../components/features/TaskItem';

// モックストレージの実装
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    getStore: () => store
  };
})();

// グローバルのlocalStorageをモックに置き換え
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('taskStore', () => {
  // 各テスト前にモックストレージをクリア
  beforeEach(() => {
    mockLocalStorage.clear();
    vi.restoreAllMocks();
  });

  describe('resetTasksStatus', () => {
    it('すべてのタスクの完了状態をfalseにリセットする', () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task 1', completed: true },
        { id: '2', title: 'Task 2', completed: false },
        { id: '3', title: 'Task 3', completed: true }
      ];

      const resetTasks = resetTasksStatus(tasks);

      expect(resetTasks).toHaveLength(3);
      expect(resetTasks.every(task => task.completed === false)).toBe(true);
    });
  });

  describe('タスク操作関数', () => {
    it('addTask: 新しいタスクを追加する', () => {
      const tasks: Task[] = [];
      const newTasks = addTask(tasks, 'New Task');

      expect(newTasks).toHaveLength(1);
      expect(newTasks[0].title).toBe('New Task');
      expect(newTasks[0].completed).toBe(false);
      expect(newTasks[0].id).toBeDefined();
    });

    it('toggleTask: タスクの完了状態を切り替える', () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task 1', completed: false }
      ];

      const updatedTasks = toggleTask(tasks, '1', true);
      expect(updatedTasks[0].completed).toBe(true);

      const revertedTasks = toggleTask(updatedTasks, '1', false);
      expect(revertedTasks[0].completed).toBe(false);
    });

    it('editTask: タスクのタイトルを編集する', () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task 1', completed: false }
      ];

      const updatedTasks = editTask(tasks, '1', 'Updated Task');
      expect(updatedTasks[0].title).toBe('Updated Task');
    });

    it('deleteTask: タスクを削除する', () => {
      const tasks: Task[] = [
        { id: '1', title: 'Task 1', completed: false },
        { id: '2', title: 'Task 2', completed: false }
      ];

      const updatedTasks = deleteTask(tasks, '1');
      expect(updatedTasks).toHaveLength(1);
      expect(updatedTasks[0].id).toBe('2');
    });
  });
});