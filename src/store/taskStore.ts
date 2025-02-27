import { atom } from 'jotai';
import { Task } from '../components/features/TaskItem';

// ローカルストレージのキー
const TASKS_KEY = 'childTodo_tasks';
const LAST_RESET_KEY = 'childTodo_lastReset';

// 初期タスクリスト
const getInitialTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

// タスクリストのアトム
export const tasksAtom = atom<Task[]>(getInitialTasks());

// タスクリストの永続化
export const persistTasksAtom = atom(
  (get) => get(tasksAtom),
  (get, set, newTasks: Task[]) => {
    set(tasksAtom, newTasks);
    localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
  }
);

// 最後のリセット日時を取得
export const getLastResetDate = (): Date => {
  const storedDate = localStorage.getItem(LAST_RESET_KEY);
  return storedDate ? new Date(storedDate) : new Date();
};

// 最後のリセット日時を保存
export const saveLastResetDate = (date: Date): void => {
  localStorage.setItem(LAST_RESET_KEY, date.toISOString());
};

// 経過時間計算関数は不要になりました

// タスク状態のリセット
export const resetTasksStatus = (tasks: Task[]): Task[] => {
  const resetTasks = tasks.map(task => ({
    ...task,
    completed: false
  }));
  
  // 最後のリセット日時を更新
  saveLastResetDate(new Date());
  
  return resetTasks;
};

// タスクの追加
export const addTask = (tasks: Task[], title: string): Task[] => {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    completed: false
  };
  
  return [...tasks, newTask];
};

// タスクの完了状態の切り替え
export const toggleTask = (tasks: Task[], id: string, completed: boolean): Task[] => {
  return tasks.map(task =>
    task.id === id ? { ...task, completed } : task
  );
};

// タスクの編集
export const editTask = (tasks: Task[], id: string, title: string): Task[] => {
  return tasks.map(task =>
    task.id === id ? { ...task, title } : task
  );
};

// タスクの削除
export const deleteTask = (tasks: Task[], id: string): Task[] => {
  return tasks.filter(task => task.id !== id);
};